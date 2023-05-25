import express from "express";
import cors from "cors";
import morgan from "morgan";
import {
  endpointNotFound,
  generalError,
} from "./middlewares/errors/errorMiddleware.js";
import pingController from "./controllers/pingController.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOEWD_ORIGIN,
  })
);

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(pingController);

app.use(endpointNotFound);

app.use(generalError);

export default app;
