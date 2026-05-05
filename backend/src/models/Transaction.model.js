import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "failed"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["bank_transfer", "card", "paypal"],
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    failureReason: {
      type: String,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "transactions",
    versionKey: false,
  },
);

transactionSchema.index({ userId: 1 });
transactionSchema.index({ orderId: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ reference: 1 });

export const Transaction = mongoose.model("Transaction", transactionSchema);
