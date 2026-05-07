import { Transaction } from "../../models/index.js";

export async function getUsersBalance(minBalance) {
  const pipeline = [

    {
      $match: {
        status: "completed"
      }
    },

    {
      $group: {
        _id: "$userId",
        balance: {
          $sum: "$amount"
        }
      }
    }
  ];

  if (minBalance != null) {
    pipeline.push({
      $match: {
        balance: {
          $gte: minBalance
        }
      }
    });
  }

  pipeline.push(

    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },

    {
      $unwind: "$user"
    },

    {
      $project: {
        _id: 0,
        userId: "$_id",
        name: "$user.name",
        balance: {
          $round: ["$balance", 2]
        }
      }
    },

    {
      $sort: {
        balance: -1
      }
    }
  );

  return await Transaction.aggregate(pipeline);
}