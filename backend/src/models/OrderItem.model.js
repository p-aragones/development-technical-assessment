import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["books", "electronics", "fashion", "home", "sports"],
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "orderItems",
    versionKey: false,
  },
);

orderItemSchema.index({ orderId: 1 });
orderItemSchema.index({ productId: 1 });
orderItemSchema.index({ category: 1 });

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);
