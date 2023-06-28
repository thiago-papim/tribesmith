import OrderModel from "../../src/database/models/order.model";

const allOrders = [ 
	OrderModel.build({
		"id": 1,
		"userId": 1,
		"productIds": []
	}),
	OrderModel.build({
		"id": 2,
		"userId": 3,
		"productIds": []
	})
];

export default allOrders;