import { Router } from "express";
import { loginRequired } from "../middlewares";
import { orderItemService } from "../services/order-item-service";
import asyncHandler from "../middlewares/async-handler";

const orderItemRouter = Router();

orderItemRouter.post(
  "/create",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { items } = req.body;
    const newOrderItem = await orderItemService.addItem(items);
    res.status(201).json(newOrderItem);
  })
);

orderItemRouter.post(
  "/list/order/",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { orderId } = req.body;
    const orderItems = await orderItemService.getItemsByOrderId(orderId);

    res.status(200).json(orderItems);
  })
);

orderItemRouter.patch(
  "/update",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { orderItemId, productId, quantity, itemStatus } = req.body;
    const toUpdate = {
      ...(quantity && { quantity }),
      ...(itemStatus && { itemStatus }),
    };

    const updateOrderItem = await orderItemService.setItem(
      orderItemId,
      productId,
      toUpdate
    );

    res.status(200).json(updateOrderItem);
  })
);

export { orderItemRouter };
