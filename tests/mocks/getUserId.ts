import UserModel from "../../src/database/models/user.model"

const userIdMock = UserModel.build(
  {
    id: 2,
    username: 'Eddie',
    vocation: 'Guerreiro',
    level: 8,
    password: '$2a$10$DNrC2TMX9SL47tto7CxEZOPWLNyo0Y.gmNuBKx2BUqy5p.4XATsKW'
  }
)

export default userIdMock;