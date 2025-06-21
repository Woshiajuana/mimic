import {
  AnyExceptionFilter,
  createSwagger,
  TransformInterceptor,
} from '@app/common';
import { Log4jsLogger } from '@nest-let/log4js';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // https://docs.nestjs.cn/9/techniques?id=%e6%97%a5%e5%bf%97
    bufferLogs: process.env.NODE_ENV === 'prod',
    cors: true,
  });

  // config
  const configService = app.get(ConfigService);
  const { host, port, prefix } = configService.get('http');

  // logger
  app.useLogger(app.get(Log4jsLogger));
  const logger = app.get(Logger);

  // 管道
  // https://github.com/typestack/class-validator
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 拦截器
  app.useGlobalInterceptors(new TransformInterceptor(logger));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 过滤器
  app.useGlobalFilters(new AnyExceptionFilter(logger));

  // api version
  app.setGlobalPrefix(prefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // swagger
  const { path } = createSwagger(app);

  // http server
  await app.listen(port);

  logger.log(`服务已启动 => http://${host}:${port}/${path}`);
})();
