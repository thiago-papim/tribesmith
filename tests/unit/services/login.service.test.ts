import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Testando corretamente os dados', async function() {
    // sinon.stub(UserModel, 'findOne').resolves(undefined)
    // const username = '';
    // const password = '123';
    // const result = await UserModel.findOne({ where: { username }});
    // if (!username) {
    //   expect(result).to.eq(0)
    // }
  })
});
