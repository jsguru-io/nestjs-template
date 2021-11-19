import { Sequelize } from 'sequelize-typescript';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MIGRATOR_TOKEN, SEQUELIZE_TOKEN } from './const';
import { SequelizeStorage, Umzug } from 'umzug';

export const databaseProviders: Provider[] = [
  {
    provide: SEQUELIZE_TOKEN,
    useFactory: async (configService: ConfigService): Promise<Sequelize> => {
      return new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        models: [`${__dirname}/../../**/*.model.{ts,js}`],
        modelMatch: (filename: string, member) => {
          const exportedMember: string = filename.substring(
            0,
            filename.indexOf('.model'),
          );
          return exportedMember === member.toLowerCase();
        },
      });
    },
    inject: [ConfigService],
  },
  {
    provide: MIGRATOR_TOKEN,
    useFactory: async (sequelize: Sequelize) => {
      const migrator: Umzug = new Umzug({
        migrations: {
          glob: [
            '**/migrations/*.migration.{ts,js}',
            {
              cwd: __dirname,
            },
          ],
        },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({
          sequelize,
        }),
        logger: console,
      });
      await migrator.down();
      await migrator.up();
      return migrator;
    },
    inject: [SEQUELIZE_TOKEN],
  },
];
