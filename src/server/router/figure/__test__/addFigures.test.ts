import "../../../../loadEnvironments.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import connectedDatabase from "../../../database/connectedDatabase.js";
import Figure from "../../../../database/models/Figure.js";
import app from "../../../app.js";
import {
  privateMessageList,
  statusCodeList,
} from "../../../utils/responseData/responseData.js";
import { tokenMock } from "../../../../mocks/user/userMoks.js";
import { requestFiguresMock } from "../../../../mocks/figures/figuresMocks.js";

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

describe("Given a post method and '/add' path", () => {
  describe("When it receives a request with a figure", () => {
    test("Then it should call response's method status with 200 and with a 'Figure added correctly' message", async () => {
      const response = await request(app)
        .post("/figures/add")
        .set("Authorization", `Bearer ${tokenMock}`)
        .send(requestFiguresMock)
        .expect(statusCodeList.add);

      expect(response.body.message).toBe(privateMessageList.add);
    });
  });

  describe("When it receives a request with an invalid figure", () => {
    test("Then it should respond with status code 400", async () => {
      await request(app)
        .post(`"/figures/add"}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCodeList.badRequest);
    });
  });
});
