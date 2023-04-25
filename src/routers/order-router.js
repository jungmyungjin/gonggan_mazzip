import { Router } from "express";
import { loginRequired, adminOnly } from "../middlewares";
import { orderService } from "../services/order-service";
import asyncHandler from "../middlewares/async-handler";

const orderRouter = Router();
const sampleOrder = require("../db/sampleData/sampleOrder.json");

orderRouter.post(
  "/create",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const { receiver, requestMessage, orderStatus } = req.body;

    const newOrder = await orderService.addOrder({
      userId,
      receiver,
      requestMessage,
      orderStatus,
    });
    res.status(201).json(newOrder);
  })
);

orderRouter.get(
  "/list/user",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const userOrders = await orderService.getOrdersByUserId(userId);
    // 혹시 DB에 order정보가 하나도 없다면 dummy 데이터 입력 <- 테스트코드라 추후 지울 예정
    if (!userOrders || userOrders.length < 1) {
      for (let i = 0; i < sampleOrder.length; i++) {
        sampleOrder[i].userId = userId;
        await orderService.addOrder(sampleOrder[i]);
      }
    }

    const { page, perPage } = req.query;
    const resultOrderList = await orderService.getOrderPage({
      userId,
      page,
      perPage,
    });

    res.status(201).json(resultOrderList);
  })
);

orderRouter.patch(
  "/update",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { orderId, receiver, requestMessage, orderStatus } = req.body;

    const toUpdate = {
      ...(receiver && { receiver }),
      ...(requestMessage && { requestMessage }),
      ...(orderStatus && { orderStatus }),
    };

    const updateOrder = await orderService.setOrder(orderId, toUpdate);
    res.status(201).json(updateOrder);
  })
);

// 관리자가 모든 유저의 주문 정보 조회 - 유저 이름, 이메일 별로 조회
orderRouter.get(
  "/searchOrder/:type",
  adminOnly,
  asyncHandler(async (req, res, next) => {
    const { type } = req.params;
    const { value } = req.query;

    const orders = await orderService.getOrders(type, value);
    res.status(201).json(orders);
  })
);

orderRouter.delete(
  "/delete/:orderId",
  adminOnly,
  asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    const deletedResult = await orderService.deleteOrder(orderId);
    res.status(201).json(deletedResult);
  })
);

export { orderRouter };
