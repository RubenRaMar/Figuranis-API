import { type Response } from "express";

export type CustomResponse = Pick<Response, "status" | "json">;
