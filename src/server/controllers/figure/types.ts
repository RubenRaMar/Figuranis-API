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
    skip: string;
    limit: string;
    filter: string;
  };
  body: RequestFigureData;
}

export interface CustomRequestUpdate extends Request {
  userId: string;
  body: RequestUpdateFigureStructure;
}
