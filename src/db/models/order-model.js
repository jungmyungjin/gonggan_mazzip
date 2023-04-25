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

  async findPage(userId, currentPage, itemsPerPage) {
    const orderPage = await Order.find({ userId })
      .populate("userId")
      .sort({ createdAt: -1 })
      .skip(itemsPerPage * (currentPage - 1))
      .limit(itemsPerPage)
      .exec();

    return orderPage;
  }

  async findByType(type, value) {
    let orders = {};
    if (type === "name") {
      orders = await Order.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        { $match: { userId: { $elemMatch: { name: new RegExp(value) } } } },
        { $sort: { name: 1, created_at: -1 } },
      ]);
    } else if (type === "email") {
      orders = await Order.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        {
          $match: {
            userId: { $elemMatch: { email: { $regex: value, $options: "i" } } },
          },
        },
        { $sort: { email: 1, created_at: -1 } },
      ]);
    }
    return orders;
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

  async delete(orderId) {
    const deleteOrderResult = await Order.findByIdAndDelete(orderId);
    return deleteOrderResult;
  }
}

const orderModel = new OrderModel();

export { orderModel };
