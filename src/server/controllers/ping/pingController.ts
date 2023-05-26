import { type Request, type Response } from "express";
import { privateMessageList } from "../../utils/responseData/responseData";

const pingController = (_req: Request, res: Response) => {
  res.status(200).json({ message: privateMessageList.ok.pong });
};

export default pingController;
