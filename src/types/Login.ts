type Code = 200 | 400 | 401;

export type Login = {
  message: string | unknown,
  code: Code
};