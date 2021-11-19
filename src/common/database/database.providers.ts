import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MIGRATOR_TOKEN, SEQUELIZE_TOKEN } from './const';
import { sequelizeFactory, migratorFactory } from './factory';

export const databaseProviders: Provider[] = [
  {
    provide: SEQUELIZE_TOKEN,
    useFactory: sequelizeFactory,
    inject: [ConfigService],
  },
  {
    provide: MIGRATOR_TOKEN,
    useFactory: migratorFactory,
    inject: [SEQUELIZE_TOKEN],
  },
];
