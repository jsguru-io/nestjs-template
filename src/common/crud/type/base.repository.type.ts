import { Model } from 'sequelize-typescript';
import { Constructor } from '../../util';

export type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;
export type ModelPayload<T> = Partial<Omit<T, keyof Model<T>>>;
export type ModelAttributes<T extends Model> = T['_attributes'];
export type ModelCreationAttributes<T extends Model> = T['_creationAttributes'];
export type ResultsWithCountSet<T extends Model> = {
  rows: T[];
  count: number;
};
export type PaginationParams = {
  limit?: number;
  offset?: number;
};
