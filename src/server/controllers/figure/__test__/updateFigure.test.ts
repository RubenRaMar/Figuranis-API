import { type NextFunction, type Response } from "express";
import Figure from "../../../../database/models/Figure";
import CustomError from "../../../Classes/CustomError/CustomError";
import {
  statusCodeList,
  privateMessageList,
} from "../../../utils/responseData/responseData";
import { updateFigure } from "../figureController";
import { requestFiguresUdgrateMock } from "../../../../mocks/figures/figuresMocks";
import { type CustomRequestUpdate } from "../types";

describe("Given updateFigure controller", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it is invoked and receives a figure", () => {
    Figure.findOneAndUpdate = jest
      .fn()
      .mockResolvedValue(requestFiguresUdgrateMock);

    const req: Partial<CustomRequestUpdate> = {
      body: requestFiguresUdgrateMock,
      userId: "646fc50910c8e8c5b17d54a7",
    };

    test("Then it should call response's method status with 200", async () => {
      await updateFigure(
        req as CustomRequestUpdate,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCodeList.ok);
    });

    test("Then it should call response's method json with a 'Correctly updated figure'", async () => {
      await updateFigure(
        req as CustomRequestUpdate,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({
        message: privateMessageList.update,
      });
    });
  });

  describe("When it receive a bad request", () => {
    test("Then it should invoke to next funtion with a error", async () => {
      const req: Partial<CustomRequestUpdate> = {
        body: requestFiguresUdgrateMock,
        userId: "646fc50910c8e8c5b17d54a7",
      };

      const error = new CustomError(
        statusCodeList.badRequest,
        privateMessageList.updateError
      );

      Figure.findOneAndUpdate = jest.fn().mockResolvedValue(undefined);

      await updateFigure(
        req as CustomRequestUpdate,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
