import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import orderService from '../../../src/services/order.service';
import orderController from '../../../src/controllers/order.controller';
import allOrders from '../../mocks/getAllOrders';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testando getAll', async function() {
    sinon.stub(orderService, 'allOrders').resolves(Promise.resolve(allOrders))
    await orderController.allOrders(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(allOrders);
  });

  it('Testando create sem userId', async function() {
    req.body = {
      productIds: [0]
    }
    await orderController.createOrder(req, res);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"userId" is required' });
  });

  it('Testando create sem productIds', async function() {
    req.body = {
      userId: 1,
    }
    await orderController.createOrder(req, res);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"productIds" is required' });
  });

  it('Testando create incorreto', async function() {
    req.body = {
      userId: 1,
      productIds: [1, 2]
    }
    sinon.stub(orderService, 'createOrder').resolves({ message: '"productIds" must include only numbers', code: 422 })
    await orderController.createOrder(req, res);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWith({ message: '"productIds" must include only numbers'});
  });

  it('Testando create correto', async function() {
    req.body = {
      userId: 1,
      productIds: [1, 2]
    }
    sinon.stub(orderService, 'createOrder').resolves({ message: { productIds: [1, 2], userId: 1 }, code: 201 })
    await orderController.createOrder(req, res);
    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith({ productIds: [ 1, 2 ], userId: 1 });
  });

});
