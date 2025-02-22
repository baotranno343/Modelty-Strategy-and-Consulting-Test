import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  message: string,
  data: T | T[] | null = null,
  statusCode = 200
) => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
  return;
};

export const errorResponse = <T = string>(
  res: Response,
  message: T,
  statusCode = 400
) => {
  res.status(statusCode).json({
    status: "error",
    message,
  });
  return;
};
