import { model } from "mongoose";
import { OrderItemSchema } from "../schemas/order-item-schema";

const OrderItem = model("orderItems", OrderItemSchema);

export class OrderItemModel {
  async findById(orderItemId) {
    const orderItem = await OrderItem.findOne({ orderItemId });
    return orderItem;
  }

  async findAllByOrderId(orderId) {
    const orderItems = await OrderItem.find({ orderId }).populate([
      "orderId",
      "productId",
    ]);
    return orderItems;
  }

  async findAllByProductId(productId) {
    const orderItems = await OrderItem.find({ productId });
    return orderItems;
  }

  async findAll() {
    const orderItems = await OrderItem.find({});
    return orderItems;
  }

  async create(orderItemInfo) {
    const createdNewOrderItem = await OrderItem.create(...orderItemInfo);
    return createdNewOrderItem;
  }

  // 주문 취소 시 itemStatus 변경
  async update({ orderItemId, update }) {
    const filter = { _id: orderItemId };
    const option = { new: true };
    const updateOrderItem = await OrderItem.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updateOrderItem;
  }
}

const orderItemModel = new OrderItemModel();

export { orderItemModel };
