import { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import productService from '../../../src/services/product.service';
import ProductModel from '../../../src/database/models/product.model';


describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Testando erro de name ter menos que 3 caracteres', async function() {
    sinon.stub(ProductModel, 'create').resolves(undefined)
    const nameInvalid = 'te';
    const price = '123';
    const orderId = 3;
    const result = await productService.createProduct(nameInvalid, price, orderId);
    expect(result.code).to.eq(422);
    expect(result.message).to.eq('"name" length must be at least 3 characters long')
  })

  it('Testando erro de price ter menos que 3 caracteres', async function() {
    sinon.stub(ProductModel, 'create').resolves(undefined)
    const name = 'teste';
    const priceInvalid = '12';
    const orderId = 3;
    const result = await productService.createProduct(name, priceInvalid, orderId);
    expect(result.code).to.eq(422);
    expect(result.message).to.eq('"price" length must be at least 3 characters long')
  })

  it('Testando erro de não ser string', async function() {
    sinon.stub(ProductModel, 'create').resolves(undefined)
    const name = { } as string;
    const priceInvalid = '122';
    const orderId = 3;
    const result = await productService.createProduct(name, priceInvalid, orderId);
    expect(result.code).to.eq(422);
    expect(result.message).to.eq('"name" must be a string')
  })

  it('Testando corretamente os dados', async function() {
    const productModelMock =  ProductModel.build({
       name: 'teste',
       price: '123',
       orderId: 3
    });
    sinon.stub(ProductModel, 'create').resolves(productModelMock)
    const name = 'teste';
    const priceInvalid = '123';
    const orderId = 3;
    const result = await productService.createProduct(name, priceInvalid, orderId);
    expect(result.code).to.eq(201);
  })
});
