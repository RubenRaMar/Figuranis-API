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
  isPurchased: boolean;
  manufacturer: string;
  material: string;
  size: number;
  weight: number;
  price: number;
  image: string;
  userId: Types.ObjectId;
}

export type RequestFigureData = Omit<FigureData, "userId">;

export interface RequestUpdateFigureStructure extends RequestFigureData {
  id: string;
  userId: string;
}

export interface FigureIdData extends FigureData {
  _id: Types.ObjectId;
}
