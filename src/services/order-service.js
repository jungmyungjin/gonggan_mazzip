import { orderModel } from "../db/models/order-model";

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async addOrder(orderInfo) {
    // const orders = await this.orderModel.findAll();
    // if (!orders) {
    //   await this.orderModel.createDummyData();
    //   return;
    // }
    console.log("addOrder orderInfo:", orderInfo);
    const createdNewOrder = await this.orderModel.create(orderInfo);
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
