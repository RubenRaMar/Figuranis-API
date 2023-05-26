import express from "express";
import cors from "cors";
import morgan from "morgan";
import {
  endpointNotFound,
  generalError,
} from "./middlewares/errors/errorMiddleware.js";
import pingController from "./controllers/ping/pingController.js";
import loginUser from "./controllers/user/userController.js";
import pathList from "./utils/path/path.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOEWD_ORIGIN,
  })
);

app.disable("x-powered-by");

app.use(morgan("dev"));

app.get(pathList.ping, pingController);

app.use(`${pathList.user}${pathList.login}`, loginUser);

app.use(endpointNotFound);

app.use(generalError);

export default app;
