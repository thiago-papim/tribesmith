import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { CreateOrder } from '../types/Order';

const allOrders = async () : Promise<object> => {
  const getAllOrder = await OrderModel.findAll({ include: {
    model: ProductModel,
    as: 'productIds',
    attributes: ['id'],
  } });
  if (getAllOrder) {
    console.log(getAllOrder);
  }
  
  const formatOrders = getAllOrder.map((order) => {
    const arrIds = order.dataValues.productIds?.map((e) => e.id);
    return {
      id: order.dataValues.id,
      userId: order.dataValues.userId,
      productIds: arrIds,
    };
  });
  return formatOrders;
};

export const verifyUserId = async (userId: number): Promise<CreateOrder> => {
  if (typeof userId !== 'number') {
    return { message: '"userId" must be a number', code: 422 };
  }
  const user = await UserModel.findOne({ where: { id: userId } });
  
  if (!user) {
    return { message: '"userId" not found', code: 404 };
  }
  return { message: 'ok', code: 201 };
};

const verifyProductIds = (productIds: number[]) : CreateOrder => {  
  if (typeof productIds !== 'object') {
    return { message: '"productIds" must be an array', code: 422 };
  }
  if (productIds.length === 0) {
    return { message: '"productIds" must include only numbers', code: 422 };
  }
  return { message: 'ok', code: 201 };
};

const createOrder = async (userId: number, productIds: number[]) 
: Promise<CreateOrder> => {
  const verifyUser = await verifyUserId(userId);
  if (verifyUser.code !== 201) {
    return verifyUser;
  }
  const verifyProducts = verifyProductIds(productIds);
  if (verifyProducts.code !== 201) {
    return verifyProducts;
  }
  const teste = await OrderModel.create({ userId });  
  const { dataValues: { id } } = teste;
  const productsPromises = productIds.map((e) => ProductModel
    .update({ orderId: id }, { where: { id: e } }));
  const resultPromises = await Promise.all(productsPromises);
  console.log(resultPromises);
  
  return { message: { productIds, userId }, code: 201 };
};

export default { allOrders, createOrder };
