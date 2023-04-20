import { Schema } from "mongoose";

const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export { OrderSchema };
