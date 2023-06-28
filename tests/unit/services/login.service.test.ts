import { expect } from 'chai';
import bcript from 'bcryptjs';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/services/login.service';
import tokenJwt from '../../../src/utils/tokenJwt';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Testando login invalido', async function() {
    sinon.stub(UserModel, 'findOne').resolves(undefined)
    const username = 'teste';
    const password = '123';
    const result = await loginService.login(username, password);
    expect(result.code).to.eq(401);
    expect(result.message).to.eq('Username or password invalid');
  })

  it('Testando login valido', async function() {
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build({
        id: 1,
        username: 'Hagar',
        vocation: 'Guerreiro',
        level: 10,
        password: '123456'
      }))
    sinon.stub(bcript, 'compareSync').resolves(true)
    const username = 'Hagar';
    const password = '123';
    const result = await loginService.login(username, password);
    expect(result.code).to.eq(200);
  })
});
