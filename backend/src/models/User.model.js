import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      enum: ["user"],
      required: true,
    },
    kycStatus: {
      type: String,
      enum: ["pending", "rejected", "verified"],
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    lastLoginAt: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "users",
    versionKey: false,
  },
);

userSchema.index({ email: 1 });
userSchema.index({ country: 1 });
userSchema.index({ kycStatus: 1 });

export const User = mongoose.model("User", userSchema);
