import "../../../loadEnvironments.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import User from "../../../database/models/User";
import connectedDatabase from "../../database/connectedDatabase";
import mongoose from "mongoose";
import app from "../../app";
import pathList from "../../utils/path/path";
import {
  privateMessageList,
  statusCodeList,
} from "../../utils/responseData/responseData";
import jwt, { type JwtPayload } from "jsonwebtoken";
import {
  userCredentialsMock,
  userCredientialsHashMock,
  userErrorCredientialsMock,
} from "../../../mocks/user/userMoks.js";

interface CustomValidResponse {
  body: { token: string };
  statusCode: number;
}

interface CustomErrorResponse {
  body: { message: string };
  statusCode: number;
}

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

describe("Given a post method /user/login endpoint", () => {
  describe("When it receives a valid credentials", () => {
    beforeEach(async () => {
      await User.create(userCredientialsHashMock);
    });

    test("Then it should respond with status code 200", async () => {
      const expectedStatusCode = statusCodeList.ok;

      const response: CustomValidResponse = await request(app)
        .post(`${pathList.user}${pathList.login}`)
        .send(userCredentialsMock);

      expect(response.statusCode).toBe(expectedStatusCode);
    });

    test("Then it should generate a user id", async () => {
      const { username } = userCredentialsMock;

      const user = await User.findOne({ username });

      const response: CustomValidResponse = await request(app)
        .post(`${pathList.user}${pathList.login}`)
        .send(userCredentialsMock);

      const payload = jwt.verify(response.body.token, process.env.JWT_SECRET!);

      const userId = payload.sub as string;

      expect(userId).toBe(user?._id.toString());
    });

    test("Then it should return a token", async () => {
      const { username } = userCredentialsMock;

      const response: CustomValidResponse = await request(app)
        .post(`${pathList.user}${pathList.login}`)
        .send(userCredentialsMock);

      const user = await User.findOne({ username });

      const tokenPayload: JwtPayload = {
        sub: user!._id.toString(),
        name: username,
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
        expiresIn: "300d",
      });

      expect(response.body).toStrictEqual({ token });
    });
  });

  describe("When it receives invalid credentials", () => {
    test("Then it should respond with a status code 401", async () => {
      const expectedStatusCode = statusCodeList.wrongCredentials;

      const response: CustomErrorResponse = await request(app)
        .post(`${pathList.user}${pathList.login}`)
        .send(userCredentialsMock);

      expect(response.statusCode).toBe(expectedStatusCode);
    });

    test("Then it should respond with a 'Wrong credentials' text", async () => {
      const expectedErrorText = "Wrong credentials";

      const response: CustomErrorResponse = await request(app)
        .post("/user/login")
        .send(userCredentialsMock);

      expect(response.body.message).toBe(expectedErrorText);
    });
  });

  describe("When it recieves a credentials with empty password", () => {
    test("Then it sounld response with a status code 400", async () => {
      const expectedStatusCode = statusCodeList.badRequest;

      const response: CustomErrorResponse = await request(app)
        .post(`${pathList.user}${pathList.login}`)
        .send(userErrorCredientialsMock);

      expect(response.statusCode).toBe(expectedStatusCode);
    });

    test("Then it should respond with a 'Bad Request' text", async () => {
      const expectedStatusCode = privateMessageList.badRequest;

      const response: CustomErrorResponse = await request(app)
        .post(`${pathList.user}${pathList.login}`)
        .send(userErrorCredientialsMock);

      expect(response.body.message).toBe(expectedStatusCode);
    });
  });
});
