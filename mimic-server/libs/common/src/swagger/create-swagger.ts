import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// https://nest.nodejs.cn/openapi/introduction
export const createSwagger = (app: INestApplication) => {
  const configService = app.get(ConfigService);

  const {
    enable,
    path = '',
    title,
    description,
    version,
    server,
  } = configService.get('swagger', {
    enable: false,
  });

  if (enable) {
    const builder = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth();

    if (server) {
      const { url, description } = server;
      builder.addServer(url, description);
    }

    const config = builder.build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(path, app, document);
  }

  return {
    server,
    enable,
    path,
    title,
    description,
    version,
  };
};
