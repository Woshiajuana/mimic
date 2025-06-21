import { isObject, isString } from '@daysnap/utils';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ApiCode } from '../enums';
import { ApiMessage } from '../enums/api-message.enum';
import { CommonException } from '../exceptions';
import { filterLogContent } from '../utils';

interface ResponseBody {
  code: ApiCode;
  message: ApiMessage | string;
  messageParams: Record<string, any> | null;
}

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const res = http.getResponse<Response>();

    let body: ResponseBody = {
      code: ApiCode.FAIL,
      message: ApiCode.FAIL,
      messageParams: null,
    };

    if (exception instanceof CommonException) {
      // 自定义异常
      body = { ...body, ...exception.getResponse() };
    } else if (exception instanceof HttpException) {
      // http 异常
      const res = exception.getResponse();
      if (isString(res)) {
        body.message = res;
      } else if (isObject(res)) {
        body.message = res.message?.toString() ?? JSON.stringify(res);
      } else {
        body.message = res?.toString() ?? exception.message;
      }
    } else if (exception instanceof Error) {
      // 错误
      body.message = exception.message;
    } else if (isObject(exception)) {
      // 未知异常
      body.message = exception.message?.toString() ?? JSON.stringify(exception);
    } else if (isString(exception)) {
      body.message = exception;
    } else {
      body.message = JSON.stringify(exception);
    }

    // http service
    const { originalUrl, method } = http.getRequest<Request>();

    this.logger.log(
      `${originalUrl} [${method}] 请求错误 => ${filterLogContent(body)}`,
    );

    res.status(HttpStatus.OK).json(body);
  }
}
