import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductModel from '../../../src/database/models/product.model';
import productsController from '../../../src/controllers/products.controller';
import productService from '../../../src/services/product.service';
import mockGetAll from '../../mocks/getAllProducts';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testando create sem name', async function() {
    req.body = {
      name: '',
      price: '123',
      orderId: 3
    }
    await productsController.createProduct(req, res);
    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be
    .calledWith({ message: '"name" is required' });
  });

  it('Testando create sem price', async function() {
    req.body = {
      name: 'Teste',
      price: '',
      orderId: 3
    }
    await productsController.createProduct(req, res);
    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be
    .calledWith({ message: '"price" is required' });
  });

  it('Testando create correto', async function() {
    req.body = {
      name: 'Teste',
      price: '123',
      orderId: 3
    }
    await productsController.createProduct(req, res);
    expect(res.status).to.be.calledWith(201);
  });

  it('Testando create incorreto', async function() {
    sinon.stub(productService, 'createProduct').resolves({
      message: '"name" must be a string',
      code: 422
    })
    req.body = {
      name: 'Teste',
      price: '123',
      orderId: 3
    }
    await productsController.createProduct(req, res);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWith({ message: '"name" must be a string' });
  });

  it('Testando getAll', async function() {
    sinon.stub(ProductModel, 'findAll').resolves(mockGetAll)
    await productsController.allProducts(req, res);
    expect(res.status).to.be.calledWith(200);
    // expect(res.json).to.be.calledWith(mockGetAll);
  });
});
