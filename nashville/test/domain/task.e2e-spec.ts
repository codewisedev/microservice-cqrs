import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@app/app.module';

describe('Task E2E Test', () => {
  let app: INestApplication;
  const staticPath = `/${'controller'}/`;

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
    // const response = await request(app.getHttpServer())
    //   .delete(staticPath + `taskId`)
    // expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
  });

  it('Get all task', async () => {});

  it('Update specified task', async () => {});

  it('Delete specified task', async () => {});

  it('Delete specified group', async () => {});
});
