import { Router } from "express";
import { loginRequired } from "../middlewares";
import { orderService } from "../services/order-service";
import asyncHandler from "../middlewares/async-handler";

const orderRouter = Router();

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

orderRouter.post(
  "/list/user",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const userOrders = await orderService.getOrdersByUserId(userId);

    res.status(201).json(userOrders);
  })
);

export { orderRouter };
