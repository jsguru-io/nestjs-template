import { ExampleService } from './example.service';
import { Test } from '@nestjs/testing';
import { ExampleRepository } from './example.repository';
import { Example } from './model/example.model';
import {
  DatabaseModule,
  MODEL_FACTORY_TOKEN,
} from '@jsgurucompany/jsg-nestjs-common';
import { ModelFactory } from '@jsgurucompany/jsg-nestjs-common';
import {
  ModelCreationAttributes,
  PaginatedSet,
} from '@jsgurucompany/jsg-nestjs-common';
import { testRegisterOptions } from '../common';

describe('ExampleService', () => {
  let service: ExampleService;
  let repository: ExampleRepository;
  let modelFactory: ModelFactory;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule.register(testRegisterOptions)],
      providers: [ExampleService, ExampleRepository],
    }).compile();

    await module.init();

    service = module.get<ExampleService>(ExampleService);
    repository = module.get<ExampleRepository>(ExampleRepository);
    modelFactory = module.get<ModelFactory>(MODEL_FACTORY_TOKEN);
  });

  it('ExampleService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('ExampleService.findAll() should return all', async () => {
    const examples: Example[] = modelFactory.createMany<Example>(Example, 3, {
      name: 'Example Name',
      age: 25,
      isActive: false,
    });

    jest.spyOn(repository, 'findAll').mockImplementation(async () => examples);

    const result: PaginatedSet<Example[]> = await service.findAll();

    expect(result).toMatchObject(<PaginatedSet>{
      total: 3,
      data: [
        {
          id: expect.any(String),
          name: 'Example Name',
          age: 25,
          isActive: false,
        },
        {
          id: expect.any(String),
          name: 'Example Name',
          age: 25,
          isActive: false,
        },
        {
          id: expect.any(String),
          name: 'Example Name',
          age: 25,
          isActive: false,
        },
      ],
    });
  });

  it('ExampleService.findPaginated() should return paginated', async () => {
    const examples: Example[] = modelFactory.createMany<Example>(Example, 2, {
      name: 'Example Name',
      age: 25,
      isActive: false,
    });

    jest.spyOn(repository, 'findAndCountAll').mockImplementation(async () => ({
      count: 2,
      rows: examples,
    }));

    const result: PaginatedSet<Example[]> = await service.findPaginated({
      offset: 2,
      limit: 2,
    });

    expect(result).toMatchObject(<PaginatedSet>{
      total: 2,
      data: [
        {
          id: expect.any(String),
          name: 'Example Name',
          age: 25,
          isActive: false,
        },
        {
          id: expect.any(String),
          name: 'Example Name',
          age: 25,
          isActive: false,
        },
      ],
    });
  });

  it('ExampleService.findById() should return model by id', async () => {
    const example: Example = modelFactory.create(Example, {
      name: 'Example Name',
      age: 25,
      isActive: false,
    });

    jest
      .spyOn(repository, 'findOneById')
      .mockImplementation(async () => example);

    const result: Example = await service.findById('uuid');

    expect(result).toBeInstanceOf(Example);
    expect(result).toMatchObject({
      id: expect.any(String),
      name: 'Example Name',
      age: 25,
      isActive: false,
    });
  });

  it('ExampleService.findById() should not return model', async () => {
    jest
      .spyOn(repository, 'findOneById')
      .mockImplementation(async () => undefined);

    const result: Example = await service.findById('uuid');

    expect(result).toBeUndefined();
  });

  it('ExampleService.findOne() should return model', async () => {
    const example: Example = modelFactory.create<Example>(Example, {
      name: 'Example Name',
      age: 23,
      isActive: false,
    });

    jest.spyOn(repository, 'findOne').mockImplementation(async () => example);

    const result: Example = await service.findOne({
      where: {
        age: 23,
      },
    });

    expect(result).toBeInstanceOf(Example);
    expect(result).toMatchObject({
      id: expect.any(String),
      name: 'Example Name',
      age: 23,
      isActive: false,
    });
  });

  it('ExampleService.create() should return model', async () => {
    const payload: ModelCreationAttributes<Example> = {
      name: 'Example Name',
      age: 23,
      isActive: false,
    };
    const example: Example = modelFactory.create<Example>(Example, payload);

    jest.spyOn(repository, 'create').mockImplementation(async () => example);

    const result: Example = await service.create(payload);

    expect(result).toBeInstanceOf(Example);
    expect(result).toMatchObject({
      id: expect.any(String),
      name: 'Example Name',
      age: 23,
      isActive: false,
    });
  });

  it('ExampleService.update() should return model', async () => {
    const payload: ModelCreationAttributes<Example> = {
      name: 'Example Name',
      age: 23,
      isActive: false,
    };
    const example: Example = modelFactory.create<Example>(Example, payload);

    jest.spyOn(repository, 'update').mockImplementation(async () => example);

    const result: Example = await service.update('exampleId', payload);

    expect(result).toBeInstanceOf(Example);
    expect(result).toMatchObject({
      id: expect.any(String),
      name: 'Example Name',
      age: 23,
      isActive: false,
    });
  });

  it('ExampleService.remove() should return undefined', async () => {
    jest.spyOn(repository, 'remove').mockImplementation(async () => undefined);

    const result = await service.remove('exampleId');

    expect(result).toBeUndefined();
  });
});
