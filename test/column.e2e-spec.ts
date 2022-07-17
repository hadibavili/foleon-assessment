import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TEST } from '../src/modules/column/constant/constant';

let columnId: number;

describe('Column Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/column (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/column')
      .expect(200);

    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].content[0].id).toEqual(1);
  });

  it('/column (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/column')
      .send({
        name: TEST.CREATE_NAME,
        row_id: 1,
      })
      .expect(201);

    expect(response.body.name).toEqual(TEST.CREATE_NAME);
    columnId = response.body.id;
  });

  it('/column (PATCH)', async () => {
    await request(app.getHttpServer())
      .patch('/column/' + columnId)
      .send({
        name: TEST.UPDATE_NAME,
      })
      .expect(200);

    const response = await request(app.getHttpServer())
      .get('/column/' + columnId)
      .expect(200);

    expect(response.body.name).toEqual(TEST.UPDATE_NAME);
  });

  it('/column/1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/column/1')
      .expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.content[0].id).toEqual(1);
  });

  it('/column/{columnId} (GET)', async () => {
    await request(app.getHttpServer())
      .delete('/column/' + columnId)
      .expect(200);
  });
});
