import { Router } from "express";
import getFigures from "../../controllers/figure/figureController.js";
import pathList from "../../utils/path/path.js";

const figureRouter = Router();

figureRouter.get(pathList.root, getFigures);

export default figureRouter;
