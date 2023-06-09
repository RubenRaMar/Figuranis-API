import { Router } from "express";
import pathList from "../../utils/path/path.js";
import {
  addFigure,
  deleteFigure,
  getFigures,
} from "../../controllers/figure/figureController.js";
import { figureValidation } from "../../../schema/figureShema.js";

const figureRouter = Router();

figureRouter.get(pathList.root, getFigures);

figureRouter.delete(`${pathList.delete}`, deleteFigure);

figureRouter.post(`${pathList.add}`, figureValidation, addFigure);

export default figureRouter;
