import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import orderService from '../../../src/services/order.service';
import allOrders from '../../mocks/getAllOrders';
import ProductModel from '../../../src/database/models/product.model';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Testando getAll', async function() {

  });
});
