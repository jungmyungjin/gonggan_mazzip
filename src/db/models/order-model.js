import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";
const sampleOrder = require("../sampleData/sampleOrder");

const Order = model("orders", OrderSchema);

export class OrderModel {
  async findById(orderId) {
    const order = await Order.findOne({ orderId });
    return order;
  }

  async findByUserId(userId) {
    const order = await Order.findById(userId);
    return order;
  }

  async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  async createDummyData() {
    const dummyOrders = await this.create(sampleOrder);
    return dummyOrders;
    console.log("createDummyData dummyOrders:", dummyOrders);
  }
}
const orderModel = new OrderModel();

export { orderModel };
