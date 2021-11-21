import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';

export type Migrator = Umzug;

export const migratorFactory = async (
  sequelize: Sequelize,
): Promise<Migrator> => {
  return new Umzug({
    migrations: {
      glob: '**/migrations/*.migration.ts',
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize,
    }),
    logger: console,
  });
};
