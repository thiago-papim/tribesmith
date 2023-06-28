import { Request, Response } from 'express';
import ProductModel from '../database/models/product.model';
import productService from '../services/product.service';

const validateFields = (name: string, price: string) => {
  if (!name) return 'name'; 
  if (!price) return 'price';
};

const createProduct = async (req: Request, res: Response) => {
  const { name, price, orderId } = req.body;
  const fields = validateFields(name, price);
  if (fields) {
    return res.status(400).json({ message: `"${fields}" is required` });
  }
  const newProduct = await productService.createProduct(name, price, orderId);
  return res.status(newProduct.code).json(newProduct.message);
};

const allProducts = async (req: Request, res: Response) => {
  const getAllProducts = await ProductModel.findAll();
  
  return res.status(200).json(getAllProducts);
};

export default { allProducts, createProduct };