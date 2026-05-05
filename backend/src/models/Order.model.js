import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "failed"],
      required: true,
    },
    statusDate: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["bank_transfer", "card", "paypal"],
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "orders",
    versionKey: false,
  },
);

orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentMethod: 1 });

export const Order = mongoose.model("Order", orderSchema);
