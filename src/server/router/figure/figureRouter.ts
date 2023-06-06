import { Router } from "express";
import pathList from "../../utils/path/path.js";
import {
  deleteFigure,
  getFigures,
} from "../../controllers/figure/figureController.js";

const figureRouter = Router();

figureRouter.get(pathList.root, getFigures);

figureRouter.delete(`${pathList.delete}/:id`, deleteFigure);

export default figureRouter;
