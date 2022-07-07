import { ExampleRepository } from './example.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { Example } from './model/example.model';
import { ModelFactory } from '../common/database/factory/model.factory';
import { DatabaseModule, MODEL_FACTORY_TOKEN } from '../common/database';
import { Op } from 'sequelize';
import { GroupedCountResultItem } from 'sequelize/types/model';
import { ResultsWithCountSet } from '../common/crud';

describe('ExampleRepository', () => {
  let repository: ExampleRepository;
  let modelFactory: ModelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [ExampleRepository],
    }).compile();

    await module.init();

    repository = module.get<ExampleRepository>(ExampleRepository);
    modelFactory = module.get<ModelFactory>(MODEL_FACTORY_TOKEN);
  });

  it('ExampleRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('ExampleRepository.findAll() should return all', async () => {
    const examples: Example[] = modelFactory.createMany(Example, 10);

    jest.spyOn(Example, 'findAll').mockImplementation(async () => examples);

    const result: Example[] = await repository.findAll();

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(10);
    expect(result[0]).toBeInstanceOf(Example);
  });

  it('ExampleRepository.findAll() should return filtered', async () => {
    const examples: Example[] = modelFactory.createMany(Example, 5);

    jest.spyOn(Example, 'findAll').mockImplementation(async () => examples);

    const result: Example[] = await repository.findAll({
      where: { name: 'Example Name', age: { [Op.gt]: 20 } },
      offset: 10,
      limit: 20,
    });

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(5);
    expect(result[0]).toBeInstanceOf(Example);
  });

  it('ExampleRepository.findAndCountAll() should return set with rows and count', async () => {
    const examples: Example[] = modelFactory.createMany(Example, 5);

    jest.spyOn(Example, 'findAndCountAll').mockImplementation(async () => ({
      count: <GroupedCountResultItem[]>(<unknown>5),
      rows: examples,
    }));

    const result: ResultsWithCountSet<Example> =
      await repository.findAndCountAll();

    expect(result).toHaveProperty('rows');
    expect(result).toHaveProperty('count');
    expect(result.rows).toBeInstanceOf(Array);
    expect(result.rows).toHaveLength(5);
    expect(result.rows[0]).toBeInstanceOf(Example);
    expect(result.count).toBe(5);
  });

  it('ExampleRepository.findAndCountAll() should return filtered set with rows and count', async () => {
    const examples: Example[] = modelFactory.createMany(Example, 5);

    jest.spyOn(Example, 'findAndCountAll').mockImplementation(async () => ({
      count: <GroupedCountResultItem[]>(<unknown>5),
      rows: examples,
    }));

    const result: ResultsWithCountSet<Example> =
      await repository.findAndCountAll({
        where: { name: 'Example Name', age: { [Op.gt]: 20 } },
        offset: 20,
      });

    expect(result).toHaveProperty('rows');
    expect(result).toHaveProperty('count');
    expect(result.rows).toBeInstanceOf(Array);
    expect(result.rows).toHaveLength(5);
    expect(result.rows[0]).toBeInstanceOf(Example);
    expect(result.count).toBe(5);
  });

  it('ExampleRepository.findPaginated() should return paginated', async () => {
    const examples: Example[] = modelFactory.createMany(Example, 5);

    jest.spyOn(Example, 'findAndCountAll').mockImplementation(async () => ({
      count: <GroupedCountResultItem[]>(<unknown>5),
      rows: examples,
    }));

    const result: ResultsWithCountSet<Example> = await repository.findPaginated(
      {
        offset: 10,
        limit: 20,
      },
    );

    expect(result).toHaveProperty('rows');
    expect(result).toHaveProperty('count');
    expect(result.rows).toBeInstanceOf(Array);
    expect(result.rows).toHaveLength(5);
    expect(result.rows[0]).toBeInstanceOf(Example);
    expect(result.count).toBe(5);
  });

  it('ExampleRepository.findOneById() should return one by id', async () => {
    const example: Example = modelFactory.create<Example>(Example);

    jest.spyOn(Example, 'findByPk').mockImplementation(async () => example);

    const result: Example = await repository.findOneById('testId');

    expect(result).toBeInstanceOf(Example);
  });

  it('ExampleRepository.findOne() should return one by filters', async () => {
    const example: Example = modelFactory.create<Example>(Example);

    jest.spyOn(Example, 'findOne').mockImplementation(async () => example);

    const result: Example = await repository.findOne({
      where: {
        age: 20,
        name: 'Test Example',
      },
    });

    expect(result).toBeInstanceOf(Example);
  });

  it('ExampleRepository.create() should return one', async () => {
    const example: Example = modelFactory.create<Example>(Example);

    jest.spyOn(Example, 'create').mockImplementation(async () => example);

    const result: Example = await repository.create({
      age: 20,
      name: 'TestExample',
    });

    expect(result).toBeInstanceOf(Example);
  });

  it('ExampleRepository.createMany() should return many', async () => {
    const examples: Example[] = modelFactory.createMany<Example>(Example, 10);

    jest.spyOn(Example, 'bulkCreate').mockImplementation(async () => examples);

    const result: Example[] = await repository.createMany([
      {
        age: 20,
        name: 'TestExample',
      },
      {
        age: 29,
        name: 'TestExample2',
      },
    ]);

    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(Example);
  });

  it('ExampleRepository.update() should return one', async () => {
    const example: Example = modelFactory.create<Example>(Example);

    jest.spyOn(Example, 'update').mockImplementation(async () => undefined);

    jest
      .spyOn(repository, 'findOneById')
      .mockImplementation(async () => example);

    const result: Example = await repository.update('testId', {
      name: 'TestName',
      age: 27,
    });

    expect(result).toBeInstanceOf(Example);
  });

  it('ExampleRepository.updateMany() should return undefined', async () => {
    jest.spyOn(Example, 'update').mockImplementation(async () => undefined);

    const result: void = await repository.updateMany(
      {
        where: {
          age: 26,
          name: 'TestName',
        },
      },
      {
        name: 'TestNamev2',
        age: 39,
      },
    );

    expect(result).toBeUndefined();
  });

  it('ExampleRepository.remove() should return undefined', async () => {
    jest.spyOn(Example, 'destroy').mockImplementation(async () => undefined);

    const result: void = await repository.remove('testId');
    const resultWithIds: void = await repository.remove(['testId', 'testId2']);

    expect(result).toBeUndefined();
    expect(resultWithIds).toBeUndefined();
  });
});
