# Development Technical Assessment (MERN Stack)

## Environment

To complete this technical assessment, you will need:

- Node.js v22\
- MongoDB v8.0

A MongoDB dump is available at the following location:
[./resources/database/dev-interview](./resources/database/dev-interview)

---

## Objective

This assessment is designed to evaluate your ability to:

- Work with data structures and algorithms
- Design efficient MongoDB aggregation pipelines
- Build clean, maintainable backend code (Node.js / Express /Mongoose)
- Apply frontend development fundamentals using React
- Deliver clear, scalable, and well-structured solutions

---

## 1. JavaScript — Data Processing & Algorithms

### Exercise 1

Given the following array of transactions:

```javascript
[
  { userId: "u1", amount: 100 },
  { userId: "u2", amount: -50 },
  { userId: "u1", amount: -30 },
  { userId: "u3", amount: 200 },
  { userId: "u2", amount: 70 }
]
```

#### Requirements

Implement a function that:

- Calculates the total balance per user
- Returns users sorted by balance (descending)
- Identifies whether each user has a negative balance

#### Expected Output Format

```javascript
{ userId: "u1", balance: 70, isNegative: false }
```

#### Considerations

- The input may contain a large number of records
- Optimize for time and space complexity

---

### Exercise 2 — Optimization

Refactor and optimize the following function:

```javascript
function getTopUsers(transactions) {
  let result = [];

  for (let i = 0; i < transactions.length; i++) {
    let total = 0;

    for (let j = 0; j < transactions.length; j++) {
      if (transactions[j].userId === transactions[i].userId) {
        total += transactions[j].amount;
      }
    }

    result.push({ userId: transactions[i].userId, total });
  }

  return result;
}
```

#### Requirements

- Improve performance (time complexity)
- Eliminate duplicated results

---

## 2. MongoDB — Aggregation Pipelines

### Exercise 1

Using the `users`, `orders`, and `orderItems` collections, compute the following:

For each user, return:

- User name
- Total number of orders
- Total amount spent
- Include only users with total spending greater than 500 (consider only completed orders)
- Sort results by total spending (descending)

---

### Exercise 2

Using the `transactions`, `users`, `orders`, and `orderItems` collections, identify completed transactions that do not match the corresponding order amount.

For each transaction, return:

- User name
- User email
- Transaction ID
- Transaction amount
- Order ID
- Order amount

---

### Exercise 3

Using the `transactions` and `orders` collections, identify orders where a transaction initially failed and was later retried.

For each order, return:

- Order ID
- Total number of transactions
- Date of the most recent transaction
- Status of the most recent transaction
- ID of the most recent transaction
- Order status

---

## 4. Backend — Node.js, Express, Mongoose

### Objective

Design and implement the following REST API endpoint:

GET /users/transactions

### Requirements

The endpoint must:

- Retrieve data from MongoDB
- Return:

  - The balance per user (sum of completed transactions)
- Support filtering via query parameter:

?minBalance=0

### Technical Expectations

- Follow a layered architecture (e.g. controller + service)
- Validate input parameters
- Implement proper error handling
- Keep business logic decoupled from routing

---

## 5. Frontend — React

Build a simple UI that:

- Displays a list of users and their balances
- Allows filtering by minimum balance
- Allows filtering by user name
- Supports sorting (e.g. by balance or user name)

### Considerations

- Avoid unnecessary re-renders
- Handle loading and error states appropriately
- Keep components simple, modular, and readable
- Use React Hooks
- Follow the Single Source of Truth (SSOT) principle

---

## Submission

Please provide:

- Source code (Git repository)
- Clear instructions to run the project
- Any assumptions, trade-offs, or design decisions made

---

Good luck 🚀
