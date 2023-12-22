import "../../../../loadEnvironments.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import { type CustomValidResponse } from "./types.js";
import connectedDatabase from "../../../database/connectedDatabase.js";
import app from "../../../app.js";
import pathList from "../../../utils/path/path.js";
import User from "../../../../database/models/User.js";
import { statusCodeList } from "../../../utils/responseData/responseData.js";

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
  await User.deleteMany();
});

describe("Given a post method /user/register endponit", () => {
  const userCredentialsMock = {
    username: "goku",
    password: "god",
  };

  describe("When it received a valid credentials", () => {
    test("Then it should respond with the registered username", async () => {
      const response: CustomValidResponse = await request(app)
        .post(`${pathList.user}${pathList.register}`)
        .send(userCredentialsMock);

      expect(response.body).toStrictEqual({ user: "goku" });
    });

    test("Then it should respond with status code 201", async () => {
      const expectedStatusCode = statusCodeList.add;

      const response: CustomValidResponse = await request(app)
        .post(`${pathList.user}${pathList.register}`)
        .send(userCredentialsMock);

      expect(response.statusCode).toStrictEqual(expectedStatusCode);
    });
  });

  describe("When it receives a credentials with empty password", () => {
    test("Then it should response with a status code 400", async () => {
      const emptyUserPasswordMock = { password: "" };
      const expectedStatusCode = statusCodeList.badRequest;

      const response: CustomValidResponse = await request(app)
        .post(`${pathList.user}${pathList.register}`)
        .send({ ...userCredentialsMock, ...emptyUserPasswordMock });

      expect(response.statusCode).toStrictEqual(expectedStatusCode);
    });
  });

  describe("When it receives a credentials with empty username", () => {
    test("Then it should response with a status code 400", async () => {
      const emptyUsernameMock = { username: "" };
      const expectedStatusCode = statusCodeList.badRequest;

      const response: CustomValidResponse = await request(app)
        .post(`${pathList.user}${pathList.register}`)
        .send({ ...userCredentialsMock, ...emptyUsernameMock });

      expect(response.statusCode).toStrictEqual(expectedStatusCode);
    });
  });
});
