import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';

const allOrders = async () : Promise<object> => {
  const getAllOrder = await OrderModel.findAll({ include: {
    model: ProductModel,
    as: 'productIds',
    attributes: ['id'],
  } });
  
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

export default { allOrders };
