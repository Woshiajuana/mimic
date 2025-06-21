import { HttpException, HttpStatus } from '@nestjs/common';
import { isString } from 'class-validator';

import { ApiCode } from '../enums';
import { ApiMessage } from '../enums/api-message.enum';

export type ExceptionResponse =
  | ApiMessage
  | string
  | {
      code?: ApiCode;
      message?: ApiMessage | string;
      messageParams?: Record<string, any> | null;
    };

export class CommonException extends HttpException {
  constructor(
    response: ExceptionResponse = {},
    status: HttpStatus = HttpStatus.OK,
  ) {
    super(
      CommonException.createResponse(response, {
        code: ApiCode.FAIL,
        message: ApiMessage.FAIL,
        messageParams: null,
      }),
      status,
    );
  }

  static createResponse(
    response: ExceptionResponse = {},
    defResponse: {
      code?: ApiCode;
      message?: ApiMessage | string;
      messageParams?: Record<string, any> | null;
    } = {},
  ) {
    return Object.assign(
      defResponse,
      isString(response) ? { message: response } : response,
    );
  }

  getResponse() {
    return super.getResponse() as object;
  }
}
