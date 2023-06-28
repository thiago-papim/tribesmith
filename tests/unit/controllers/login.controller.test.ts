import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginController from '../../../src/controllers/login.controller';
import loginService from '../../../src/services/login.service';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });


  it('Testando login sem username', async function() {
    req.body = {
      username: '',
      password: '123456'
    }
    await loginController.login(req, res);
    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be
    .calledWith({ message: '"username" and "password" are required' });
  });

  it('Testando login sem password', async function() {
    req.body = {
      username: 'Teste',
      password: ''
    }
    await loginController.login(req, res);
    expect(res.status).to.be.calledWith(400)
    expect(res.json).to.be
    .calledWith({ message: '"username" and "password" are required' });
  });

  it('Testando login com erro de senha', async function() {
    req.body = {
      username: 'Teste',
      password: '123456'
    }
    sinon.stub(loginService, 'login').resolves({
      message: 'Username or password invalid',
      code: 401
    })
    await loginController.login(req, res);
    expect(res.status).to.be.calledWith(401)
    expect(res.json).to.be
    .calledWith({ message: 'Username or password invalid' });
  });

  it('Testando login correto', async function() {
    req.body = {
      username: 'Teste',
      password: '123456'
    }
    sinon.stub(loginService, 'login').resolves({
      message: "0oduoJudA4Z3ihggA",
      code: 200,
    })
    await loginController.login(req, res);
    expect(res.status).to.be.calledWith(200)
    expect(res.json).to.be
    .calledWith({ token: '0oduoJudA4Z3ihggA' });
  });

});
