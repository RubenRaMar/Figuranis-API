import "../../../../loadEnvironments.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectedDatabase from "../../../database/connectedDatabase.js";
import mongoose from "mongoose";
import Figure from "../../../../database/models/Figure.js";
import {
  badRequestFiguresUdgrateMock,
  figuresMock,
  requestFiguresUdgrateMock,
} from "../../../../mocks/figures/figuresMocks.js";
import app from "../../../app.js";
import { tokenMock } from "../../../../mocks/user/userMoks.js";
import {
  privateMessageList,
  statusCodeList,
} from "../../../utils/responseData/responseData.js";

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

describe("Given a put method and '/:id' path", () => {
  beforeEach(async () => {
    await Figure.create(figuresMock);
  });

  describe("When it is invoked and receives a figure", () => {
    test("Then it should return a response with 200 status code and 'Correctly updated figure'", async () => {
      const response = await request(app)
        .put(`/figures`)
        .send(requestFiguresUdgrateMock)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCodeList.ok);

      expect(response.body.message).toBe(privateMessageList.update);
    });
  });

  describe("When it receive a bad request", () => {
    test("Then it should return a response with 400 status code and 'The figure could not be updated'", async () => {
      const response = await request(app)
        .put(`/figures`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .send(badRequestFiguresUdgrateMock)
        .expect(statusCodeList.badRequest);

      expect(response.body.message).toBe(privateMessageList.updateError);
    });
  });
});
