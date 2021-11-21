import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { MIGRATOR_TOKEN, SEQUELIZE_TOKEN } from './const';

@Module({
  providers: [...databaseProviders],
  exports: [SEQUELIZE_TOKEN, MIGRATOR_TOKEN],
})
export class DatabaseModule {}
