import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';

export const errorsHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status);
  res.json({
    status: status,
    message: message
  });
};
