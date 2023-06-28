import jwt, { Secret } from 'jsonwebtoken';
import { PayloadJwt } from '../types/JWT';

const jwtSecret: Secret = process.env.JWT_SECRET || 'palavra secreta';

const tokenGenerate = (payload: PayloadJwt) : string => {
  const token: string = jwt.sign(payload, jwtSecret);
  return token;
};

const verifyToken = <T extends PayloadJwt>(token: string): T => {
  const arrToken = token.split(' ');
  const decodedToken: T = jwt.verify(arrToken[1], jwtSecret) as T;
  return decodedToken;
};

export default { tokenGenerate, verifyToken };