import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { ExampleDTO } from '../src/example/dto/example.dto';

describe('ExampleController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/examples (POST) 201', async () => {
    const payload: ExampleDTO = {
      name: 'exampleName',
      age: 25,
      isActive: true,
      completedAt: <Date>(<unknown>'2022-04-12T22:57:58.491Z'),
    };

    const { body } = await request(app.getHttpServer())
      .post('/examples')
      .send(payload)
      .expect(201);

    expect(body).toMatchObject({
      id: expect.any(String),
      name: 'exampleName',
      age: 25,
      isActive: true,
      completedAt: '2022-04-12T22:57:58.491Z',
      exampleTypeId: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('/examples (GET) 200', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/examples')
      .expect(200);

    expect(body).toMatchObject({
      total: expect.any(Number),
      data: expect.any(Array),
    });
  });

  it('/examples/:id (GET) 200', async () => {
    const payload: ExampleDTO = {
      name: 'exampleName',
      age: 25,
      isActive: true,
      completedAt: <Date>(<unknown>'2022-04-12T22:57:58.491Z'),
    };

    const {
      body: { id },
    } = await request(app.getHttpServer()).post('/examples').send(payload);

    const { body } = await request(app.getHttpServer())
      .get(`/examples/${id}`)
      .expect(200);

    expect(body).toMatchObject({
      id: expect.any(String),
      name: 'exampleName',
      age: 25,
      isActive: true,
      completedAt: '2022-04-12T22:57:58.491Z',
      exampleTypeId: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('/examples/:id (PUT) 200', async () => {
    const payload: ExampleDTO = {
      name: 'exampleName',
      age: 25,
      isActive: true,
      completedAt: <Date>(<unknown>'2022-04-12T22:57:58.491Z'),
    };

    const {
      body: { id },
    } = await request(app.getHttpServer()).post('/examples').send(payload);

    const updatePayload: ExampleDTO = {
      name: 'exampleUpdateName',
      age: 30,
      isActive: false,
      completedAt: <Date>(<unknown>'2022-02-12T22:57:58.491Z'),
    };

    const { body } = await request(app.getHttpServer())
      .put(`/examples/${id}`)
      .send(updatePayload)
      .expect(200);

    expect(body).toMatchObject({
      id: expect.any(String),
      name: 'exampleUpdateName',
      age: 30,
      isActive: false,
      completedAt: '2022-02-12T22:57:58.491Z',
      exampleTypeId: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('/examples/:id (DELETE) 204', async () => {
    const payload: ExampleDTO = {
      name: 'exampleName',
      age: 25,
      isActive: true,
      completedAt: <Date>(<unknown>'2022-04-12T22:57:58.491Z'),
    };

    const {
      body: { id },
    } = await request(app.getHttpServer()).post('/examples').send(payload);

    await request(app.getHttpServer()).delete(`/examples/${id}`).expect(204);
  });
});
