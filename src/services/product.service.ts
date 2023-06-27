import ProductModel from '../database/models/product.model';
import { CreateProduct } from '../types/Product';

const validateFields = (field: string, nameField: string) : string | undefined => {
  if (typeof field !== 'string') return `"${nameField}" must be a string`;
  if (field.length < 3) { 
    return `"${nameField}" length must be at least 3 characters long`; 
  }
};

const createProduct = async (name: string, price: string, orderId: number)
: Promise<CreateProduct> => {
  const validateNameAndPrice = validateFields(name, 'name') || validateFields(price, 'price');
  if (validateNameAndPrice) {
    return { message: validateNameAndPrice, code: 422 };
  }
  const newProduct = await ProductModel.create({ name, price, orderId });
  return { message: newProduct, code: 201 };
};

export default {
  createProduct,
};