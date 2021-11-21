import { QueryInterface } from 'sequelize';
import { SequelizeStorage } from 'umzug';
import { LoggerFn } from '../../logger';
import { IMigrationMeta } from './migration.interface';

export type MigratorContext = QueryInterface;

export interface IMigratorOptions {
  migrationsGlob: string;
  migrationsPath: string;
  context: MigratorContext;
  storage: SequelizeStorage;
  logger?: Record<'info' | 'warn' | 'error' | 'debug', LoggerFn>;
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
