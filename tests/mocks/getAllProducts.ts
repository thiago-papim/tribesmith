import ProductModel from "../../src/database/models/product.model"

const mockGetAll = [
  ProductModel.build({
    "id": 1,
    "name": "Excalibur",
    "price": "10 peças de ouro",
    "orderId": 1
  }),
  ProductModel.build({
    "id": 1,
    "name": "Excalibur",
    "price": "10 peças de ouro",
    "orderId": 1
  })
]

export default mockGetAll