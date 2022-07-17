import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TEST } from '../src/modules/content/constant/constant';

let contentId: number;


describe('Content Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/content (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/content')
      .expect(200);

    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].type).toEqual('image');
  });

  it('/content (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/content')
      .send({
        value: TEST.CONTENT_VALUE,
        type: TEST.CONTENT_TYPE,
        column_id: 1,
      })
      .expect(201);

    expect(response.body.value).toEqual(TEST.CONTENT_VALUE);
    contentId = response.body.id;
  });

  it('/content (PATCH)', async () => {
    await request(app.getHttpServer())
      .patch('/content/' + contentId)
      .send({
        value: TEST.CONTENT_VALUE_UPDATE,
        type: TEST.CONTENT_TYPE,
      })
      .expect(200);

    const response = await request(app.getHttpServer())
      .get('/content/' + contentId)
      .expect(200);

    expect(response.body.value).toEqual(TEST.CONTENT_VALUE_UPDATE);
    expect(response.body.type).toEqual(TEST.CONTENT_TYPE);
  });

  it('/contents/1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/content/1')
      .expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.type).toEqual(TEST.CONTENT_TYPE);
  });

  it('/content/type/image (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/content/type/image')
      .expect(200);

    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].type).toEqual(TEST.CONTENT_TYPE);
  });

  it('/content/1 (GET)', async () => {
    await request(app.getHttpServer()).delete('/content/1').expect(400);
  });
});
