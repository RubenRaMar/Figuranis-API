import { type Request } from "express";
import { type RequestFigureData } from "../../../types";

interface CustomRequest extends Request {
  userId: string;
  params: {
    figureId: string;
  };
  query: {
    skip: string;
    limit: string;
  };
  body: RequestFigureData;
}

export default CustomRequest;
