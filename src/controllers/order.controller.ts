import { Request, Response } from 'express';
import orderService from '../services/order.service';

const validateFields = (userId: string, productIds: string) => {
  if (!userId) return 'userId'; 
  if (!productIds) return 'productIds';
};

const allOrders = async (req: Request, res: Response) => {
  const getAllOrder = await orderService.allOrders();
  return res.status(200).json(getAllOrder);
};

const createOrder = async (req: Request, res: Response) => {
  const { userId, productIds } = req.body;
  const validate = validateFields(userId, productIds);
  if (validate) {
    return res.status(400).json({ message: `"${validate}" is required` });
  }
  const { message, code } = await orderService.createOrder(userId, productIds);
  if (code !== 201) {
    return res.status(code).json({ message });
  }
  return res.status(code).json(message);
};

export default { allOrders, createOrder };