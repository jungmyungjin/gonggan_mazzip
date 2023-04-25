import { orderModel } from "../db/models/order-model";
import { parsePaginationParameters } from "./utils";

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

  async getOrders(type, value) {
    const ordersInfo = await this.orderModel.findByType(type, value);
    if (!ordersInfo) {
      usersInfo = "없는 사용자 주문 정보 입니다. 다시 한 번 확인해 주세요.";
    }
    return ordersInfo;
  }

  async deleteOrder(orderId) {
    const deletedOrder = await this.orderModel.delete(orderId);
    if (!deletedOrder) {
      throw new Error(`${orderId} 주문의 삭제 처리에 실패하였습니다.`);
    }
    return deletedOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
