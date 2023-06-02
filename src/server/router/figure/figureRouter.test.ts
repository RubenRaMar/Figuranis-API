import "../../../loadEnvironments.js";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectedDatabase from "../../database/connectedDatabase";
import mongoose from "mongoose";
import Figure from "../../../database/models/Figure";
import { figuresMock } from "../../../mocks/figures/fuguresMocks";
import app from "../../app";
import pathList from "../../utils/path/path";
import { tokenMock } from "../../../mocks/user/userMoks.js";
import { statusCodeList } from "../../utils/responseData/responseData.js";
let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectedDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Figure.deleteMany();
});

describe("Given a get method and '/figures' path", () => {
  beforeEach(async () => {
    await Figure.create(figuresMock);
  });

  describe("When it receives a request with a valid token", () => {
    test("Then it should return a response with 200 status code and figure list", async () => {
      const response = await request(app)
        .get(pathList.figures)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCodeList.ok);

      expect(response.body.figure).toHaveLength(5);
    });
  });

  describe("When it receives a request with a invalid token", () => {
    test("Then it should return a response with 401 status code", async () => {
      await request(app)
        .get(pathList.figures)
        .expect(statusCodeList.wrongCredentials);
    });
  });
});
