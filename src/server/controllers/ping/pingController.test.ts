import { type Request, type Response } from "express";
import pingController from "./pingController";
import { type CustomResponse } from "../../../types";
import {
  privateMessageList,
  statusCodeList,
} from "../../utils/responseData/responseData";

describe("Given a pingController controller", () => {
  describe("When receives a reponse", () => {
    const req = {};
    const res: CustomResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    pingController(req as Request, res as Response);

    test("Then it should call the response's method status with 200", () => {
      const expectedStatusCode = statusCodeList.ok;

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with '🏓 Pong'", () => {
      const expectedResponseBody = privateMessageList.ok.pong;

      expect(res.json).toHaveBeenCalledWith({ message: expectedResponseBody });
    });
  });
});
