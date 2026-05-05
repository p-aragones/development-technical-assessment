import { User } from "../../models/index.js";

// Finds completed orders that belong to the current user in the aggregation.
function matchCompletedOrdersForCurrentUser() {
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
function keepOrderAmountOnly() {
  return {
    $project: {
      _id: 1,
      orderAmount: 1,
    },
  };
}

// Loads completed orders with their calculated amounts for each user.
function lookupCompletedOrdersWithAmounts() {
  return {
    $lookup: {
      from: "orders",
      let: { userId: "$_id" },
      pipeline: [
        matchCompletedOrdersForCurrentUser(),
        lookupOrderItems(),
        addOrderAmount(),
        keepOrderAmountOnly(),
      ],
      as: "completedOrders",
    },
  };
}

// Calculates total completed orders and total spending per user.
function addUserSpendingTotals() {
  return {
    $addFields: {
      totalOrders: { $size: "$completedOrders" },
      totalAmountSpent: { $sum: "$completedOrders.orderAmount" },
    },
  };
}

// Filters users whose total spending is greater than the given amount.
function matchUsersWithSpendingGreaterThan(amount) {
  return {
    $match: {
      totalAmountSpent: { $gt: amount },
    },
  };
}

// Shapes the final response fields returned to the frontend.
function formatUserSpendingResult() {
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
function sortBySpendingDescending() {
  return {
    $sort: {
      totalAmountSpent: -1,
    },
  };
}

// Returns users with completed-order spending greater than 500.
export function getUserSpending() {
  return User.aggregate([
    lookupCompletedOrdersWithAmounts(),
    addUserSpendingTotals(),
    matchUsersWithSpendingGreaterThan(500),
    formatUserSpendingResult(),
    sortBySpendingDescending(),
  ]);
}
