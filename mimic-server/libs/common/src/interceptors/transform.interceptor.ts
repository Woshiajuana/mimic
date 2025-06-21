import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

import { ApiCode } from '../enums';
import { ApiMessage } from '../enums/api-message.enum';
import { filterLogContent } from '../utils';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest();

    return next.handle().pipe(
      map((data = null) => {
        // 直接返回图片文件
        if (data instanceof StreamableFile) {
          return data;
        }

        // http service
        const { originalUrl, method } = req as Request;
        const body = Object.assign(
          {
            code: ApiCode.SUCCESS,
            message: ApiMessage.SUCCESS,
            messageParams: null,
          },
          { data },
        );
        this.logger.log(
          `${originalUrl} [${method}] 请求返回 => ${filterLogContent(body)}`,
        );
        return body;
      }),
    );
  }
}
