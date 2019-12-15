import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import HttpException from '../utils/HttpException';

export const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    next(new HttpException(401, 'Undefined token'));
    return;
  }
  const token = bearerHeader.split(' ')[1];
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    next(new HttpException(401, 'Invalid token'));
    return;
  }

  // Nuevo token tras cada petición
  const { username } = jwtPayload;
  const newToken = jwt.sign({ username }, config.jwtSecret, {
    expiresIn: '1h'
  });
  res.setHeader('authorization', newToken);

  next();
};
