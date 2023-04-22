import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const OrderItemSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => {
        return uuidv4();
      },
    },
    orderId: {
      type: String,
      ref: "orders",
      required: true,
      unique: false,
    },
    productId: {
      type: String,
      ref: "products",
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
