import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductModel from '../../../src/database/models/product.model';
import productsController from '../../../src/controllers/products.controller';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  // it('Testando getAll', async function() {
  //   const mock = ProductModel.build(
  //     {
  //       id: 1,
  //       name: "Excalibur",
  //       price: "10 peças de ouro",
  //       orderId: 1
  //     },
  //   )
  //   sinon.stub(ProductModel, 'findAll').resolves([mock])
  //   const result = await productsController.allProducts(req , res);
  //   console.log(result);
    
    
  // })
});
