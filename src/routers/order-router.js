import { Router } from "express";
import { loginRequired } from "../middlewares";
import asyncHandler from "../middlewares/async-handler";
import { orderService } from "../services/order-service";

const orderRouter = Router();
const requestHandler = require("../middlewares/async-handler");

orderRouter.post(
  "/create",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    console.log("order create userId:", userId);
    const { receiver, requestMessage } = req.body;

    const newOrder = await orderService.addOrder({
      userId,
      receiver,
      requestMessage,
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

    res.status(201).json();
  })
);

export { orderRouter };
