import { Transaction, User,  Order, OrderItem} from "../../models/index.js";

// Finds completed orders that belong to the current user in the aggregation.
function matchCompletedOrders() {
  return {
    $match: {
      $expr: {
        $and: [
          { $eq: ["$userId", "$$userId"] },
          { $eq: ["$status", "completed"] },
        ],
      },
    },
  };
}

// Adds each completed order's related order items.
function lookupOrderItems() {
  return {
    $lookup: {
      from: "orderItems",
      localField: "_id",
      foreignField: "orderId",
      as: "items",
    },
  };
}

// Calculates each order total from item quantity and price.
function addOrderAmount() {
  return {
    $addFields: {
      orderAmount: {
        $sum: {
          $map: {
            input: "$items",
            as: "item",
            in: { $multiply: ["$$item.quantity", "$$item.price"] },
          },
        },
      },
    },
  };
}

// Keeps only the fields needed for the user spending totals.
function keepOrderAmount() {
  return {
    $project: {
      _id: 1,
      orderAmount: 1,
    },
  };
}

// Loads completed orders with their calculated amounts for each user.
function lookupCompletedOrders() {
  return {
    $lookup: {
      from: "orders",
      let: { userId: "$_id" },
      pipeline: [
        matchCompletedOrders(),
        lookupOrderItems(),
        addOrderAmount(),
        keepOrderAmount(),
      ],
      as: "completedOrders",
    },
  };
}

// Calculates total completed orders and total spending per user.
function addUserSpending() {
  return {
    $addFields: {
      totalOrders: { $size: "$completedOrders" },
      totalAmountSpent: { $sum: "$completedOrders.orderAmount" },
    },
  };
}

// Filters users whose total spending is greater than the given amount.
function filterUserSpending(amount) {
  return {
    $match: {
      totalAmountSpent: { $gt: amount },
    },
  };
}

// Shapes the final response fields returned to the frontend.
function formatUserSpending() {
  return {
    $project: {
      _id: 0,
      userName: "$name",
      totalOrders: 1,
      totalAmountSpent: { $round: ["$totalAmountSpent", 2] },
    },
  };
}

// Sorts users by total spending from highest to lowest.
function sortSpending() {
  return {
    $sort: {
      totalAmountSpent: -1,
    },
  };
}

// Returns users with completed-order spending greater than 500.
export function getUserSpending() {
  return User.aggregate([
    lookupCompletedOrders(),
    addUserSpending(),
    filterUserSpending(500),
    formatUserSpending(),
    sortSpending(),
  ]);
}

// -- Exercise 2 -- //

export async function getTransactionMismatch() {
  const transactions = await Transaction.find({status: "completed"});
  const mismatched = []

  for (const t of transactions) {
    if (!t.orderId) continue
    const order = await Order.findById(t.orderId);
    if (!order) continue
    const items = await OrderItem.find({ orderId: order._id });
    let total = 0
    for (const item of items) {
      total += item.price * item.quantity
    }
    if (total.toFixed(2) != t.amount.toFixed(2)) {
      const user = await User.findById(order.userId)
      mismatched.push({
        name: user.name,
        email: user.email,
        transactionId: t._id,
        transactionAmount: t.amount,
        orderId: order._id,
        orderAmount: total.toFixed(2)
      })
    }
  }
  return mismatched
}