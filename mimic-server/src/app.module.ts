import { CoreModule, HelperModule, LoggerMiddleware } from '@app/common';
import { DbModule } from '@app/db';
import { ConfigModule } from '@nest-let/config';
import { Log4jsModule } from '@nest-let/log4js';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';

import { AppController } from './app.controller';
import { IntentionModule } from './modules/intention/intention.module';
import { UserModule } from './modules/user/user.module';
import { ValuationModule } from './modules/valuation/valuation.module';

@Module({
  imports: [
    ConfigModule.forRootAsync({
      filepath: [
        resolve(__dirname, `config`, `config.yaml`),
        resolve(__dirname, `config`, `config.${process.env.NODE_ENV}.yaml`),
      ],
    }),
    Log4jsModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get('log4js');
      },
      inject: [ConfigService],
    }),
    DbModule,
    CoreModule,
    HelperModule,
    UserModule,
    IntentionModule,
    ValuationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
