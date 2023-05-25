import "../../loadEnvironments.js";
import request from "supertest";
import app from "../app";

interface CustomResponse {
  body: { messaje: string };
  statusCode: number;
}

describe("Given a pingController controller", () => {
  describe("When the server receives a request with any method or endpoint", () => {
    test("Then it should return a response with 200 status code", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "🏓 Pong";

      const response: CustomResponse = await request(app)
        .get("/")
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({ message: expectedMessage });
    });
  });
});
