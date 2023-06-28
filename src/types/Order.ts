type ProductIds = {
  id: number
};

export type Order = {
  id: number,
  userId: number,
  productIds?: ProductIds[],
};

type Code = 201 | 404 | 422;
export type CreateOrder = {
  message: string | unknown,
  code: Code
};