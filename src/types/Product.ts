export type Product = {
  id: number;
  name: string;
  price: string;
  orderId: number;
};

type Code = 201 | 400 | 422;
export type CreateProduct = {
  message: string | unknown,
  code: Code
};