import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { WriterModule } from './../src/writer.module';
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
      imports: [WriterModule]
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

  it("/inventory (POST)", async () => {
    const response = await request(app.getHttpServer()).post("/inventory").send(
      {
        "name": "From TEST Power Shield",
        "description": "This Shield from TEST tribe is heavy",
        "powerlevel": 40
      }
    );
    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
    expect(response.body.id).toEqual(4);
    expect(response.body.name).toEqual("From TEST Power Shield");
    expect(response.body.description).toEqual("This Shield from TEST tribe is heavy");
    expect(response.body.powerlevel).toEqual(40);
  });

  it("/inventory/3 (PUT)", async () => {
    const response = await request(app.getHttpServer()).put("/inventory/3").send(
      {
        "name": "From TEST Power Shield",
        "description": "This Shield from TEST tribe is heavy",
        "powerlevel": 40
      }
    );
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toEqual(3);
    expect(response.body.name).toEqual("From TEST Power Shield");
    expect(response.body.description).toEqual("This Shield from TEST tribe is heavy");
    expect(response.body.powerlevel).toEqual(40);
  });


  it("/inventory/3 (DELETE)", async () => {
    const response = await request(app.getHttpServer()).delete("/inventory/3");
    expect(response.status).toEqual(200);
  });
});