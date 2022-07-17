import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MESSAGES, TEST } from '../src/modules/row/constant/constant';

let rowId: number;

describe('Row Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/row (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/row').expect(200);

    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].columns[0].id).toEqual(1);
    expect(response.body[0].columns[0].content[0].id).toEqual(1);
  });

  it('/row (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/row')
      .send({
        name: TEST.CREATE_NAME,
        page_id: 1,
      })
      .expect(201);

    expect(response.body.name).toEqual(TEST.CREATE_NAME);
    rowId = response.body.id;
  });

  it('/row (PATCH)', async () => {
    await request(app.getHttpServer())
      .patch('/row/' + rowId)
      .send({
        name: TEST.UPDATE_NAME,
      })
      .expect(200);

    const response = await request(app.getHttpServer())
      .get('/row/' + rowId)
      .expect(200);

    expect(response.body.name).toEqual(TEST.UPDATE_NAME);
  });

  it('/row/1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/row/1')
      .expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.columns[0].id).toEqual(1);
    expect(response.body.columns[0].content[0].id).toEqual(1);
  });

  it('/row/{rowId} (GET)', async () => {
    await request(app.getHttpServer())
      .delete('/row/' + rowId)
      .expect(200);
  });
});
