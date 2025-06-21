import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { filterLogContent } from '../utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, _: Response, next: NextFunction) {
    const { originalUrl, method, ip, params, query, body } = req;

    this.logger.log(
      `${originalUrl} [${method}] 请求参数 => ${filterLogContent({
        ip,
        params,
        query,
        body,
      })}`,
    );

    next();
  }
}

export function withLoggerMiddleware(logger: Logger) {
  return (req: Request, _: Response, next: NextFunction) => {
    const { originalUrl, method, ip, params, query, body } = req;

    logger.log(
      `${originalUrl} [${method}] 请求参数 => ${filterLogContent({
        ip,
        params,
        query,
        body,
      })}`,
    );

    next();
  };
}
