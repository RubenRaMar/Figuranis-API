import { type Request } from "express";

interface CustomRequest extends Request {
  userId: string;
  params: {
    figureId: string;
  };
}

export default CustomRequest;
