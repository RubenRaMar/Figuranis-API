import { type Response } from "express";

export type CustomResponse = Pick<Response, "status" | "json">;

export interface UserCredentials {
  username: string;
  password: string;
}
