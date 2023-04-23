import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiver: {
      type: new Schema(
        {
          receiverName: String,
          receiverPhoneNumber: String,
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
      required: true,
    },
    requestMessage: {
      type: String,
      required: false,
    },
    orderStatus: {
      type: String,
      enum: ["결제 완료", "상품 준비 중", "배송 중", "배송 완료"],
      required: true,
      default: "결제 완료",
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

export { OrderSchema };
