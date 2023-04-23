import { Schema } from "mongoose";

const OrderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
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
