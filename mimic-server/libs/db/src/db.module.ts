import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Brand, Intention, Model, Series, User, Valuation } from './entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('mysql');
      },
    }),
    TypeOrmModule.forFeature([
      User,
      Valuation,
      Intention,
      Brand,
      Model,
      Series,
    ]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DbModule {}
