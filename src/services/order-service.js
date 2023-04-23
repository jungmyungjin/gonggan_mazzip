import { orderModel } from "../db/models/order-model";

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

  async getOrderPage({ page = 1, perPage = 10 }) {
    // 현재 페이지와 페이지당 제한 항목 수
    const currentPage = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    const itemsPerPage = parseInt(perPage, 10) > 0 ? parseInt(perPage, 10) : 10;

    // 데이터베이스의 문서 수
    const total = await this.orderModel.estimatedDocumentCount();

    // 페이지네이션을 적용한 데이터베이스 쿼리를 실행합니다.
    const orders = await this.orderModel
      .find()
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();

    const totalPage = Math.ceil(total / orders);

    return { orders, currentPage, itemsPerPage, totalPage };
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
