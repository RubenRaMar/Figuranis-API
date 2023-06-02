import express from "express";
import cors from "cors";
import morgan from "morgan";
import {
  endpointNotFound,
  generalError,
} from "./middlewares/errors/errorMiddleware.js";
import pingController from "./controllers/ping/pingController.js";
import pathList from "./utils/path/path.js";
import userRouter from "./router/user/userRouter.js";
import figureRouter from "./router/figure/figureRouter.js";
import auth from "./middlewares/errors/auth/authMiddleware.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOEWD_ORIGIN,
  })
);

app.disable("x-powered-by");

app.use(morgan("dev"));

app.get(pathList.root, pingController);

app.use(pathList.user, userRouter);

app.use(pathList.figures, auth, figureRouter);

app.use(endpointNotFound);

app.use(generalError);

export default app;
