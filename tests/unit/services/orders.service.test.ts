import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import orderService from '../../../src/services/order.service';
import allOrders from '../../mocks/getAllOrders';
import ProductModel from '../../../src/database/models/product.model';
import UserModel from '../../../src/database/models/user.model';
import userIdMock from '../../mocks/getUserId';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Testando create com userId sem ser um number', async function() {
    const userId = '1' as unknown as number;
    const result = await orderService.createOrder(userId, [1]);
    expect(result.code).to.eq(422);
    expect(result.message).to.eq('"userId" must be a number');
  });

  it('Testando create com usuario inexistente', async function() {
    sinon.stub(UserModel, 'findOne').resolves(undefined);
    const result = await orderService.createOrder(1000, [1]);
    expect(result.code).to.eq(404);
    expect(result.message).to.eq('"userId\" not found');
  });

  it('Testando create com productsIds sem ser um array', async function() {
    sinon.stub(UserModel, 'findOne').resolves(userIdMock);
    const productIds = '1' as unknown as number[];
    const result = await orderService.createOrder(1000, productIds);
    expect(result.code).to.eq(422);
    expect(result.message).to.eq('"productIds" must be an array');
  });

  it('Testando create com productsIds array igual a zero', async function() {
    sinon.stub(UserModel, 'findOne').resolves(userIdMock);
    const result = await orderService.createOrder(1, []);
    expect(result.code).to.eq(422);
    expect(result.message).to.eq('"productIds" must include only numbers');
  });

  it('Testando create correto', async function() {
    sinon.stub(UserModel, 'findOne').resolves(userIdMock);
    sinon.stub(orderService, 'createOrder').resolves(
      { message: { productIds: [1, 2], userId: 1 }, code: 201 }
    )
    const result = await orderService.createOrder(1, [1, 2]);
    expect(result.code).to.eq(201);
  });

  it('Testando getAll', async function() {
    sinon.stub(OrderModel, 'findAll').resolves(allOrders);
    const result = await orderService.allOrders();
    // expect(result).to.eq(allOrders)
  });
});
