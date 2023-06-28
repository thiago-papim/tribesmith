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

});
