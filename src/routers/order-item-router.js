import { Router } from "express";
import { loginRequired, adminOnly } from "../middlewares";
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

orderItemRouter.get(
  "/list/order/:orderId",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    const orderItems = await orderItemService.getItemsByOrderId(orderId);
    res.status(201).json(orderItems);
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

    res.status(201).json(updateOrderItem);
  })
);

orderItemRouter.get(
  "/searchOrderItem/:type",
  adminOnly,
  asyncHandler(async (req, res, next) => {
    const { type } = req.params;
    const { value } = req.query;

    const orderItems = await orderItemService.getOrderItems(type, value);
    res.status(201).json(orderItems);
  })
);

orderItemRouter.delete(
  "/delete/:orderItemId",
  adminOnly,
  asyncHandler(async (req, res, next) => {
    const { orderItemId } = req.params;
    const deletedOrderItem = await orderItemService.deleteOrderItem(
      orderItemId
    );
    res.status(201).json(deletedOrderItem);
  })
);

export { orderItemRouter };
