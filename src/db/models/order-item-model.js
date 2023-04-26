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

  async findByType(type, value) {
    let orderItems = {};
    if (type === "user") {
      orderItems = await OrderItem.aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "orderId",
            foreignField: "_id",
            as: "order",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "order.userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$order" },
        { $unwind: "$user" },
        { $unwind: "$product" },
        { $match: { "user.name": { $regex: value } } },
        { $sort: { created_at: -1 } },
      ]);
    } else if (type === "order") {
      orderItems = await OrderItem.aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "orderId",
            foreignField: "_id",
            as: "order",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "order.userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$order" },
        { $unwind: "$user" },
        { $unwind: "$product" },
        { $match: { "order.receiver.receiverName": { $regex: value } } },
        { $sort: { created_at: -1 } },
      ]);
    } else if (type === "product") {
      orderItems = await OrderItem.aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "orderId",
            foreignField: "_id",
            as: "order",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "order.userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$order" },
        { $unwind: "$user" },
        { $unwind: "$product" },
        { $match: { "product.productName": { $regex: value } } },
        { $sort: { created_at: -1 } },
      ]);
    }
    return orderItems;
  }

  async findAll() {
    const orderItems = await OrderItem.find({});
    return orderItems;
  }

  async create(orderItemInfo) {
    const createdNewOrderItem = await OrderItem.create(orderItemInfo);
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

  async delete(orderItemId) {
    const deleteOrderItemResult = await OrderItem.findByIdAndDelete(
      orderItemId
    );
    return deleteOrderItemResult;
  }
}

const orderItemModel = new OrderItemModel();

export { orderItemModel };
