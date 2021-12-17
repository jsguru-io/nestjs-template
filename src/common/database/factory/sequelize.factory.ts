import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

export const sequelizeFactory = async (
  configService: ConfigService,
): Promise<Sequelize> => {
  return new Sequelize({
    dialect: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    models: [`${__dirname}/../../../**/*.model.{ts,js}`],
    modelMatch: (filename: string, member) => {
      const exportedMember: string = filename.substring(
        0,
        filename.indexOf('.model'),
      );
      return exportedMember === member.toLowerCase();
    },
  });
};
