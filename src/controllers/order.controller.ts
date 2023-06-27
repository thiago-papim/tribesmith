import { Request, Response } from 'express';
import orderService from '../services/order.service';

const allOrders = async (req: Request, res: Response) => {
  const getAllOrder = await orderService.allOrders();
  return res.status(200).json(getAllOrder);
};

export default { allOrders };