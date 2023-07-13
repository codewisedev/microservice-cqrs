import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@app/app.module';
import { TaskController } from '@app/domain/task/task.controller';
import { TaskResponse } from '@app/domain/task/response';

describe('Task E2E Test', () => {
  let app: INestApplication;
  let task: TaskResponse;
  const staticPath = `/${TaskController.path}/`;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create new task', async () => {
    const response = await request(app.getHttpServer()).post(
      staticPath + 'create',
    );
    expect(response.statusCode).toBe(HttpStatus.CREATED);
  });

  it('Get all task', async () => {
    const response = await request(app.getHttpServer()).post(
      staticPath + 'list',
    );
    expect(response.statusCode).toBe(HttpStatus.OK);

    task = response[0];
  });

  it('Update specified task', async () => {
    const response = await request(app.getHttpServer()).post(
      staticPath + `/${task.id}/update`,
    );
    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
  });

  it('Delete specified task', async () => {
    const response = await request(app.getHttpServer()).post(
      staticPath + `/${task.id}/delete`,
    );
    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
  });
});
