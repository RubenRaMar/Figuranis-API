import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOEWD_ORIGIN,
  })
);

app.disable("x-powered-by");

app.use(morgan("dev"));

export default app;
