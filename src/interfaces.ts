import { NextFunction, Request, Response } from "express";

export interface IMovies {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

export type TRequestExpress = (
  req: Request,
  res: Response
) => Promise<Response>;

export type TMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response | void >;

export type TFormat = (
  text: string,
  listKeys: string[],
  listValues: any[]
) => string;

