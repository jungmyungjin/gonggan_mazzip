import { orderModel } from "../db/models/order-model";
import { parsePaginationParameters } from "./utils";
const sampleOrder = require("../db/sampleData/sampleOrder.json");

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async addOrder(orderInfo) {
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

  async getOrderPage({ userId, page = 1, perPage = 10 }) {
    const userOrders = await this.orderModel.findByUserId(userId);
    // 혹시 DB에 order정보가 하나도 없다면 dummy 데이터 입력 <- 테스트코드라 추후 지울 예정
    if (!userOrders || userOrders.length < 1) {
      for (let i = 0; i < sampleOrder.length; i++) {
        await orderService.addOrder(userId, sampleOrder[i]);
      }
    }

    // 현재 페이지와 페이지당 제한 항목 수
    const { currentPage, itemsPerPage } = parsePaginationParameters({
      page,
      perPage,
    });

    const orderPage = await this.orderModel.findPage(
      userId,
      currentPage,
      itemsPerPage
    );

    return orderPage;
  }

  async setOrder(orderId, toUpdate) {
    const updatedOrder = await this.orderModel.update({
      orderId,
      update: toUpdate,
    });
    return updatedOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
