import { type Response } from "express";
import { type Types } from "mongoose";

export type CustomResponse = Pick<Response, "status" | "json">;

export interface UserCredentials {
  username: string;
  password: string;
}

export interface FigureData {
  title: string;
  character: string;
  franchise: string;
  purchased: boolean;
  manufacturer: string;
  material: string;
  size: number;
  weight: number;
  price: number;
  image: string;
  user: Types.ObjectId;
}

export interface RequestFigureData {
  title: string;
  character: string;
  franchise: string;
  purchased: boolean;
  manufacturer: string;
  material: string;
  size: number;
  weight: number;
  price: number;
  image: string;
}

export interface RequestUpdateFigureStructure extends RequestFigureData {
  id: string;
  user: string;
}

export interface FigureIdData extends FigureData {
  _id: Types.ObjectId;
}
