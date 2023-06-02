import { Router } from "express";
import getFigures from "../../controllers/figure/figureController";

const figureRouter = Router();

figureRouter.get("/figures", getFigures);

export default figureRouter;
