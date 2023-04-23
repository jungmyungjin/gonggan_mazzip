import { Router } from "express";
import { loginRequired } from "../middlewares";
import { orderItemService } from "../services/order-item-service";
import asyncHandler from "../middlewares/async-handler";

const orderItemRouter = Router();
const sampleOrderItem = require("../db/sampleData/sampleOrderItme.json");

orderItemRouter.post(
  "/create",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { orderId, productId, quantity, itemStatus } = req.body;
    const newOrderItem = await orderItemService.addItem({
      orderId,
      productId,
      quantity,
      itemStatus,
    });
    res.status(201).json(newOrderItem);
  })
);

orderItemRouter.post(
  "/list/order/",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { orderId, productId } = req.body;
    console.log("orderId:", orderId, "productId:", productId);
    const orderItems = await orderItemService.getItemsByOrderId(orderId);

    res.status(200).json(orderItems);
  })
);

export { orderItemRouter };
