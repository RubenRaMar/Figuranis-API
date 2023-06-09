import "../../../../loadEnvironments.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectedDatabase from "../../../database/connectedDatabase.js";
import mongoose from "mongoose";
import Figure from "../../../../database/models/Figure.js";
import { figuresMock } from "../../../../mocks/figures/figuresMocks.js";
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

describe("Given a delete method and '/delete/:id' path", () => {
  beforeEach(async () => {
    await Figure.create(figuresMock);
  });

  describe("When it receives a request with an id 'a1b2c3d4e5f6a7b8c9d0e1f2' of a figure", () => {
    test("Then it should return a response with 200 status code and 'The figure has been removed'", async () => {
      const id = "a1b2c3d4e5f6a7b8c9d0e1f2";

      const response = await request(app)
        .delete(`/figures/delete/${id}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCodeList.ok);

      expect(response.body.message).toBe(privateMessageList.delete);
    });
  });

  describe("When it receives a request with a non-existent id '5fbd2a81f4b3c96d58d32c9a'", () => {
    test("Then it should return a response with 404 status code and 'No figure found'", async () => {
      const id = "5fbd2a81f4b3c96d58d32c9a";

      const response = await request(app)
        .delete(`/figures/delete/${id}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCodeList.notFound);

      expect(response.body.message).toBe(privateMessageList.deleteError);
    });
  });
});
