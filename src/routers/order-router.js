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

orderRouter.get(
  "/list/user",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
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

export { orderRouter };
