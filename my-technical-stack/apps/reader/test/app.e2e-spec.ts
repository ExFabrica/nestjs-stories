import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ReaderModule } from './../src/reader.module';
const fs = require('fs');

describe('ReaderController (e2e)', () => {
  let app: INestApplication;

  const databaseName: string = "db/tests/sqlite";

  const removeDb = () => {
    try {
      if (fs.existsSync(databaseName)) {
        fs.unlinkSync(databaseName);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const createTestDataSet = () => {
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database(databaseName);

    db.run(`INSERT INTO inventoryItem
    (name, description, powerlevel)
    VALUES
    ("test1", 'description1', 0),
    ("test2", 'description2', 10),
    ("test3", 'description3', 20)
    `);
  }

  beforeAll(async () => {
    removeDb();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ReaderModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    createTestDataSet();
  });

  afterAll(async () => {
    await Promise.all([
      app.close(),
    ])
  });

  it('/inventory (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/inventory');
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(3);
  });
});
