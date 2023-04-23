import { orderModel } from "../db/models/order-model";

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async addOrder(userId, orderInfo) {
    const newOrderInfo = { userId, ...orderInfo };
    const createdNewOrder = await this.orderModel.create(newOrderInfo);
    return createdNewOrder;
  }

  async getOrdersByUserId(userId) {
    const order = await this.orderModel.findByUserId(userId);
    return order;
  }

  async getOrderData(orderId) {
    const order = await this.orderModel.findById(orderId);
    return order;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
