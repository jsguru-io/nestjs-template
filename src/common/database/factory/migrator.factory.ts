import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';
import { QueryInterface } from 'sequelize';
import { LoggerFn } from '../../logger';

export interface IMigratorConstructor {
  migrationsGlob: string;
  migrationsPath: string;
  context: QueryInterface;
  storage: SequelizeStorage;
  logger?: Record<'info' | 'warn' | 'error' | 'debug', LoggerFn>;
}

export interface IMigrationMeta {
  name: string;
  path?: string;
}

export interface ICreateMigrationOptions {
  name: string;
  folder?: string;
}

export interface IMigrator {
  up: () => Promise<IMigrationMeta[]>;
  down: () => Promise<IMigrationMeta[]>;
  create: (options: ICreateMigrationOptions) => Promise<void>;
  getMigrationsPath: () => string;
  setMigrationsPath: (path: string) => void;
}

export class Migrator implements IMigrator {
  private migrationsPath = '';
  private driver: Umzug;

  constructor(options: IMigratorConstructor) {
    this.setMigrationsPath(options.migrationsPath);
    this.initDriver(options);
  }

  private initDriver(options: IMigratorConstructor): void {
    this.driver = new Umzug({
      migrations: {
        glob: options.migrationsGlob,
      },
      context: options.context,
      storage: options.storage,
      logger: options.logger,
    });
  }

  getMigrationsPath(): string {
    return this.migrationsPath;
  }

  setMigrationsPath(path: string): void {
    this.migrationsPath = path;
  }

  async create({ name, folder }: ICreateMigrationOptions): Promise<void> {
    return this.driver.create({
      name: `${name}.migration.ts`,
      folder: folder ?? this.getMigrationsPath(),
      prefix: 'TIMESTAMP',
      allowConfusingOrdering: true,
    });
  }

  async up(): Promise<IMigrationMeta[]> {
    return this.driver.up();
  }

  async down(): Promise<IMigrationMeta[]> {
    return this.driver.down();
  }
}

export const migratorFactory = async (
  sequelize: Sequelize,
): Promise<IMigrator> => {
  console.log(__dirname);
  return new Migrator({
    migrationsGlob: '**/migrations/*.migration.ts',
    migrationsPath: `${__dirname}/../migrations/`,
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize,
    }),
    logger: console,
  });
};
