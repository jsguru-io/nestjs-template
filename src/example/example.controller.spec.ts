import { ExampleController } from './example.controller';
import { Test } from '@nestjs/testing';
import { DatabaseModule, MODEL_FACTORY_TOKEN } from '../common/database';
import { ExampleService } from './example.service';
import { ModelFactory } from '../common/database/factory/model.factory';
import { ExampleRepository } from './example.repository';
import { Example } from './model/example.model';
import { PaginatedSet } from '../common/crud';

describe('ExampleController', () => {
  let controller: ExampleController;
  let service: ExampleService;
  let modelFactory: ModelFactory;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [ExampleService, ExampleRepository],
      controllers: [ExampleController],
    }).compile();

    await module.init();

    controller = module.get<ExampleController>(ExampleController);
    service = module.get<ExampleService>(ExampleService);
    modelFactory = module.get<ModelFactory>(MODEL_FACTORY_TOKEN);
  });

  it('ExampleController should be defined', () => {
    expect(ExampleController).toBeDefined();
  });

  it('ExampleController.findAll() should return all', async () => {
    const examples: Example[] = modelFactory.createMany<Example>(Example, 3);
    jest.spyOn(service, 'findAll').mockImplementation(async () => ({
      total: 3,
      data: examples,
    }));

    const result: PaginatedSet<Example[]> = await controller.findAll();

    expect(result).toMatchObject({
      total: 3,
      data: expect.any(Array),
    });
  });

  it('ExampleController.find() should return paginated', async () => {
    const examples: Example[] = modelFactory.createMany<Example>(Example, 3);
    jest.spyOn(service, 'findPaginated').mockImplementation(async () => ({
      total: 3,
      data: examples,
    }));

    const result: PaginatedSet<Example[]> = await controller.find({
      offset: 0,
      limit: 5,
    });

    expect(result).toMatchObject({
      total: 3,
      data: expect.any(Array),
    });
  });

  it('ExampleController.findById() should return model by id', async () => {
    const example: Example = modelFactory.create<Example>(Example);
    jest.spyOn(service, 'findById').mockImplementation(async () => example);

    const result: Example = await service.findById('exampleId');

    expect(result).toBeInstanceOf(Example);
  });

  it('ExampleController.create() should return model', async () => {
    const example: Example = modelFactory.create<Example>(Example);

    jest.spyOn(service, 'create').mockImplementation(async () => example);

    const result: Example = await service.create({
      name: 'Example Name',
      age: 23,
      isActive: false,
    });

    expect(result).toBeInstanceOf(Example);
  });

  it('ExampleController.update() should return model', async () => {
    const example: Example = modelFactory.create<Example>(Example);

    jest.spyOn(service, 'update').mockImplementation(async () => example);

    const result: Example = await service.update('exampleId', {
      name: 'Example Name',
      age: 23,
      isActive: false,
    });

    expect(result).toBeInstanceOf(Example);
  });

  it('ExampleService.remove() should return undefined', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => undefined);

    const result = await service.remove('exampleId');

    expect(result).toBeUndefined();
  });
});
