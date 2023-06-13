import { type Response, type NextFunction } from "express";
import Figure from "../../../../database/models/Figure.js";
import { figuresMock } from "../../../../mocks/figures/figuresMocks.js";
import { getFigureById } from "../figureController.js";
import { type AuthRequest } from "../../../middlewares/errors/auth/types.js";
import { type CustomResponse } from "../../../../types.js";
import {
  privateMessageList,
  statusCodeList,
} from "../../../utils/responseData/responseData.js";
import CustomError from "../../../Classes/CustomError/CustomError.js";

describe("Given a getFigureById controller", () => {
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a request with an id of a figure that exists", () => {
    const req: Partial<AuthRequest> = {
      params: { figureId: figuresMock[0]._id.toString() },
    };

    test("Then it should return the figure", async () => {
      Figure.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(figuresMock[0]),
      });

      await getFigureById(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ figure: figuresMock[0] });
    });

    test("Then it should return the 200 status code", async () => {
      Figure.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(figuresMock[0]),
      });

      await getFigureById(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCodeList.ok);
    });
  });

  describe("When it receive a request for a figure that does not exist", () => {
    test("Then it should invoke to next funtion with a error", async () => {
      const req: Partial<AuthRequest> = {
        params: { id: "343214" },
      };

      const error = new CustomError(404, privateMessageList.deleteError);

      Figure.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await getFigureById(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
