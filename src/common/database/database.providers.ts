import { Sequelize } from 'sequelize-typescript';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const databaseProviders: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
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
      await sequelize.sync({ force: true });
      return sequelize;
    },
    inject: [ConfigService],
  },
];
