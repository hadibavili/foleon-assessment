import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MESSAGES, TEST } from '../src/modules/page/constant/constant';

let pageId: number;


describe('Page Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/page (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/page')
      .expect(200);

    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].rows[0].id).toEqual(1);
    expect(response.body[0].rows[0].columns[0].id).toEqual(1);
    expect(response.body[0].rows[0].columns[0].content[0].id).toEqual(1);
  });

  it('/page (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/page')
      .send({
        name: TEST.CREATE_NAME,
      })
      .expect(201);

    expect(response.body.name).toEqual(TEST.CREATE_NAME);
    pageId = response.body.id;
  });

  it('/page (PATCH)', async () => {
    await request(app.getHttpServer())
      .patch('/page/' + pageId)
      .send({
        name: TEST.UPDATED_NAME,
      })
      .expect(200);

    const response = await request(app.getHttpServer())
      .get('/page/' + pageId)
      .expect(200);

    expect(response.body.name).toEqual(TEST.UPDATED_NAME);
  });

  it('/page/1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/page/1')
      .expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.rows[0].id).toEqual(1);
    expect(response.body.rows[0].columns[0].id).toEqual(1);
    expect(response.body.rows[0].columns[0].content[0].id).toEqual(1);
  });

  it('/page/{pageId} (GET)', async () => {
    await request(app.getHttpServer())
      .delete('/page/' + pageId)
      .expect(200);
  });
});
