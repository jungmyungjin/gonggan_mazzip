import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const OrderSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => {
        return uuidv4();
      },
    },
    userId: {
      type: String,
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
