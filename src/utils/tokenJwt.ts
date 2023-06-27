import jwt, { JwtPayload } from 'jsonwebtoken';
// import { PayloadJwt } from '../types/JWT';

const jwtSecret = process.env.JWT_SECRET || 'palavra secreta';

const tokenGenerate = (payload: JwtPayload) : string => jwt.sign(payload, jwtSecret);

// const verifyToken = (token) => jwt.verify(token, jwtSecret);

export default { tokenGenerate };