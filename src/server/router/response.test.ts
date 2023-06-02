import "../../loadEnvironments.js";
import request from "supertest";
import app from "../app";
import {
  privateMessageList,
  statusCodeList,
} from "../utils/responseData/responseData.js";
import pathList from "../utils/path/path.js";

interface CustomResponse {
  body: { messaje: string };
  statusCode: number;
}

describe("Given a pingController controller", () => {
  describe("When the server receives a request with any method or endpoint", () => {
    test("Then it should return a response with 200 status code", async () => {
      const expectedStatusCode = statusCodeList.ok;
      const expectedMessage = privateMessageList.ok.pong;

      const response: CustomResponse = await request(app)
        .get(pathList.slash)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({ message: expectedMessage });
    });
  });
});
