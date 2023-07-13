import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@app/app.module';
import { TaskController } from '@app/domain/task/task.controller';
import { TaskResponse } from '@app/domain/task/response';
import { CreateTaskRequest, UpdateTaskRequest } from '@app/domain/task/request';

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
    const data: CreateTaskRequest = {
      title: 'MyTask',
      description: 'MyTaskDescription',
    };

    const response = await request(app.getHttpServer())
      .post(staticPath + 'create')
      .send(data);
    console.log(response);

    expect(response.statusCode).toBe(HttpStatus.CREATED);
  });

  it('Get all task', async () => {
    const response = await request(app.getHttpServer()).get(
      staticPath + 'list/1/1',
    );
    console.log(response);

    expect(response.statusCode).toBe(HttpStatus.OK);

    task = response.body.data.items[0];
  });

  it('Update specified task', async () => {
    const data: UpdateTaskRequest = {
      title: 'MyTask',
      description: 'MyTaskDescription',
    };

    const response = await request(app.getHttpServer())
      .put(staticPath + `${task.id}/update`)
      .send(data);
    console.log(response);

    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
  });

  it('Delete specified task', async () => {
    const response = await request(app.getHttpServer()).delete(
      staticPath + `${task.id}/delete`,
    );
    console.log(response);

    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
  });
});
