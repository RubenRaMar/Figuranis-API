import { Router } from "express";
import pathList from "../../utils/path/path.js";
import {
  addFigure,
  deleteFigure,
  getFigureById,
  getFigures,
  updateFigure,
} from "../../controllers/figure/figureController.js";
import { figureValidation } from "../../../schema/figureShema.js";

const figureRouter = Router();

figureRouter.get(pathList.root, getFigures);

figureRouter.get("/:id", getFigureById);

figureRouter.delete(pathList.delete, deleteFigure);

figureRouter.post(pathList.add, figureValidation, addFigure);

figureRouter.put(pathList.root, figureValidation, updateFigure);

export default figureRouter;
