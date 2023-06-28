import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Login } from '../types/Login';
import tokenJwt from '../utils/tokenJwt';

const login = async (username: string, password: string) : Promise<Login> => {
  const newLogin = await UserModel.findOne({ where: { username } });  
  if (!newLogin || !bcrypt.compareSync(password, newLogin.dataValues.password)) {
    return { message: 'Username or password invalid', code: 401 };
  }
  const { id, username: user } = newLogin.dataValues;
  const token = tokenJwt.tokenGenerate({ id, username: user });
  
  return { message: token, code: 200 };
};

export default { login };