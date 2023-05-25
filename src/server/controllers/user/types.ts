import { type Request } from "express";
import { type UserCredentials } from "../../../types.js";

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;
