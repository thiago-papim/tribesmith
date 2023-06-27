import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }
  const newLogin = await loginService.login(username, password);
  if (newLogin.code !== 200) {
    return res.status(newLogin.code).json({ message: newLogin.message });
  }
  return res.status(200).json({ token: newLogin.message });
};

export default { login };