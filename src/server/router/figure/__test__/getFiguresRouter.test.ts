import "../../../../loadEnvironments.js";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectedDatabase from "../../../database/connectedDatabase.js";
import mongoose from "mongoose";
import Figure from "../../../../database/models/Figure.js";
import { figuresMock } from "../../../../mocks/figures/figuresMocks.js";
import app from "../../../app.js";
import pathList from "../../../utils/path/path.js";
import { tokenMock, userIdMock } from "../../../../mocks/user/userMoks.js";
import { statusCodeList } from "../../../utils/responseData/responseData.js";
import { type FigureIdData } from "../../../../types.js";

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
      const userFiguresLength = figuresMock.filter(
        (figure) => figure.userId.toString() === userIdMock
      ).length;

      const response = await request(app)
        .get(pathList.figures)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCodeList.ok);

      const figures = response.body.figures as FigureIdData[];

      figures.forEach((figure) => {
        expect(figure).toHaveProperty("userId", userIdMock);
        expect(figure).toHaveProperty("franchise");
      });

      expect(figures).toHaveLength(userFiguresLength);
    });
  });

  describe("When it receives a request with a invalid token", () => {
    test("Then it should return a response with 401 status code and a 'Missing token' message", async () => {
      const errorMessage = "Missing token";

      const response = await request(app)
        .get(pathList.figures)
        .expect(statusCodeList.wrongCredentials);

      const message = response.body.message as string | undefined;

      expect(message).toStrictEqual(errorMessage);
    });
  });
});
