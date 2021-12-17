import { Model } from 'sequelize-typescript';
import { FindOptions, UpdateOptions } from 'sequelize';
import {
  ModelAttributes,
  ModelCreationAttributes,
  ModelPayload,
  ModelType,
} from './type';

export abstract class BaseRepository<T extends Model<T>> {
  protected constructor(protected readonly model: ModelType<T>) {}

  async findAll(options?: FindOptions<T>): Promise<T[]> {
    return this.model.findAll(options);
  }

  async findOneById(id: string): Promise<T> {
    return this.model.findByPk(id);
  }

  async findOne(options?: FindOptions<T>): Promise<T> {
    return this.model.findOne(options);
  }

  async create(payload: ModelPayload<T>): Promise<T> {
    return this.model.create(<ModelCreationAttributes<T>>payload);
  }

  async createMany(payload: ModelPayload<T>[]) {
    return this.model.bulkCreate(<ModelCreationAttributes<T>[]>payload);
  }

  async update(id: string, payload: ModelPayload<T>): Promise<T> {
    await this.model.update(<ModelAttributes<T>>payload, {
      where: { id },
    });
    return this.findOneById(id);
  }

  async updateMany(
    options: UpdateOptions,
    payload: ModelPayload<T>,
  ): Promise<void> {
    await this.model.update(<ModelAttributes<T>>payload, options);
    return;
  }

  async remove(id: string | string[]): Promise<void> {
    await this.model.destroy({ where: { id } });
    return;
  }
}
