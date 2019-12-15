import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(req.headers['authorization']);
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    res.status(401).send('Unauthorized');
    return;
  }
  const token = bearerHeader.split(' ')[1];
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    res.status(401).send('Unauthorized');
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
