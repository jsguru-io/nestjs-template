import 'reflect-metadata';
import 'sequelize';
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
      id: expect.anything(),
    });
  });

  it('/examples (GET)', async () => {
    return request(app.getHttpServer()).get('/examples').expect(200);
  });
});
