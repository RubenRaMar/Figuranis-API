import { Router } from "express";
import pathList from "../../utils/path/path.js";
import { getFigures } from "../../controllers/figure/figureController.js";

const figureRouter = Router();

figureRouter.get(pathList.root, getFigures);

export default figureRouter;
