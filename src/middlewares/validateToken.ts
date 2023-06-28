import { NextFunction, Request, Response } from 'express';
import tokenJwt from '../utils/tokenJwt';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    tokenJwt.verifyToken(authorization);  
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateToken;