import { type Request } from "express";
import {
  type RequestUpdateFigureStructure,
  type RequestFigureData,
} from "../../../types";

export interface CustomRequest extends Request {
  userId: string;
  params: {
    figureId: string;
  };
  query: {
    page?: string;
    limit?: string;
    purchased?: string;
  };
  body: RequestFigureData;
}

export interface CustomRequestUpdate extends Request {
  userId: string;
  body: RequestUpdateFigureStructure;
}
