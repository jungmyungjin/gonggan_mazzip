import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
  async findById(orderId) {
    const order = await Order.find({ orderId });
    return order;
  }

  async findByUserId(userId) {
    const order = await Order.find({ userId }).populate("userId");
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

  async update({ orderId, update }) {
    const filter = { _id: orderId };
    const option = { new: true };
    const updateOrder = await Order.findOneAndUpdate(filter, update, option);

    return updateOrder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
