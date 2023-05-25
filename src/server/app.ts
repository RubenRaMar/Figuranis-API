import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:4005", "http://localhost:4000"],
  })
);

app.disable("x-powered-by");

export default app;
