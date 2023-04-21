import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const OrderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    },
    orderItemId: {
      type: String,
      required: true,
      default: uuidv4(),
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "proucts",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    itemStatus: {
      type: String,
      enum: ["구매 완료", "취소 완료"],
      required: true,
      default: "구매 완료",
    },
  },
  {
    collection: "order-items",
    timestamps: true,
  }
);

export { OrderItemSchema };
