import { type NextFunction, type Response } from "express";
import { type CustomResponse } from "../../../../types";
import { deleteFigure } from "../figureController";
import Figure from "../../../../database/models/Figure";
import { figuresMock } from "../../../../mocks/figures/figuresMocks";
import {
  privateMessageList,
  statusCodeList,
} from "../../../utils/responseData/responseData";
import { type AuthRequest } from "../../../middlewares/errors/auth/types";
import CustomError from "../../../Classes/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a deleteFigure controller", () => {
  describe("When it receives a request of for an existing figure", () => {
    const req: Partial<AuthRequest> = {
      params: { id: figuresMock[0]._id.toString() },
    };

    Figure.findOneAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(figuresMock),
    });

    test("Then it should call response's method status with 200", async () => {
      await deleteFigure(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCodeList.ok);
    });

    test("Then it should call response's method json with a 'The figure has been removed'", async () => {
      await deleteFigure(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({
        message: privateMessageList.delete,
      });
    });
  });

  describe("When you receive a request for a figure that does not exist", () => {
    test("Then it should invoke to next funtion with a error", async () => {
      const req: Partial<AuthRequest> = {
        params: { id: "343214" },
      };

      const error = new CustomError(404, privateMessageList.deleteError);

      Figure.findOneAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await deleteFigure(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
