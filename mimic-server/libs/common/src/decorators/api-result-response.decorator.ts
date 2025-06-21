import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { ApiCode } from '../enums';
import { ApiMessage } from '../enums/api-message.enum';
import { ApiVo } from '../vo';

export interface ApiResultResponseOptions<T extends Type<any>> {
  code?: ApiCode;
  message?: ApiMessage | string;
  model?: T;
  isArray?: boolean;
  isPager?: boolean;
  status?: HttpStatus;
  description?: string;
}

const baseTypeNames = ['String', 'Number', 'Boolean'];

// 参考
// https://docs.nestjs.com/openapi/operations#advanced-generic-apiresponse
// https://juejin.cn/post/7043781859569827848
// https://juejin.cn/post/7080812346968375304
// https://juejin.cn/post/6992098225020911629
export const ApiResultResponse = <T extends Type<any>>(
  options?: ApiResultResponseOptions<T>,
) => {
  const { code, message, model, isPager, isArray, status, description } =
    Object.assign(
      {
        code: ApiCode.SUCCESS,
        message: ApiMessage.SUCCESS,
        isPager: false,
        isArray: false,
        status: HttpStatus.OK,
        description: '响应报文',
      },
      options,
    );

  const decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[] =
    [];
  let data: SchemaObject | ReferenceObject;

  if (model && baseTypeNames.includes(model.name)) {
    data = { type: model.name.toLocaleLowerCase() };
  } else if (model) {
    decorators.push(ApiExtraModels(model));
    if (isPager) {
      data = {
        type: 'object',
        properties: {
          list: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
          count: {
            type: 'number',
            default: 0,
          },
        },
      };
    } else if (isArray) {
      data = {
        type: 'array',
        items: { $ref: getSchemaPath(model) },
      };
    } else {
      data = { $ref: getSchemaPath(model) };
    }
  } else {
    data = { type: 'null', default: null };
  }

  decorators.push(
    ApiExtraModels(ApiVo),
    ApiResponse({
      description,
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiVo) },
          {
            properties: {
              code: {
                default: code,
              },
              message: {
                default: message,
              },
              data,
            },
          },
        ],
      },
    }),
  );

  return applyDecorators(...decorators);
};
