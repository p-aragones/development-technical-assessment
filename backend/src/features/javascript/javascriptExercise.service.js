function parseTransactions(code) {
  const codeWithoutTrailingSemicolon = code.trim().replace(/;$/, "");
  const objectPropertyNamePattern = /([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g;

  // convert to JSON keys.
  const codeWithQuotedPropertyNames = codeWithoutTrailingSemicolon.replace(
    objectPropertyNamePattern,
    '$1"$2":',
  );
  const jsonLikeCode = codeWithQuotedPropertyNames.replace(/'/g, '"');

  try {
    return JSON.parse(jsonLikeCode);
  } catch {
    const error = new Error("Code must be an array of transaction objects");
    error.statusCode = 400;
    throw error;
  }
}

function validateTransactions(transactions) {
  if (!Array.isArray(transactions)) {
    const error = new Error("Code must contain an array");
    error.statusCode = 400;
    throw error;
  }

  for (const transaction of transactions) {
    if (
      typeof transaction !== "object" ||
      transaction === null ||
      typeof transaction.userId !== "string" ||
      typeof transaction.amount !== "number"
    ) {
      const error = new Error(
        "Each transaction must include a string userId and numeric amount",
      );
      error.statusCode = 400;
      throw error;
    }
  }
}

function calculateBalances(transactions) {
  const balances = new Map();

  for (const transaction of transactions) {
    balances.set(
      transaction.userId,
      (balances.get(transaction.userId) || 0) + transaction.amount,
    );
  }

  return Array.from(balances, ([userId, balance]) => ({
    userId,
    balance,
    isNegative: balance < 0,
  })).sort((firstUser, secondUser) => secondUser.balance - firstUser.balance);
}

export function submitExercise1Code(code) {
  const startTime = performance.now();

  if (typeof code !== "string" || code.trim() === "") {
    const error = new Error("Code is required");
    error.statusCode = 400;
    throw error;
  }

  const transactions = parseTransactions(code);
  validateTransactions(transactions);
  const users = calculateBalances(transactions);
  const durationInSeconds = (performance.now() - startTime) / 1000;

  return {
    message: "Balances calculated successfully",
    durationInSeconds,
    users,
  };
}
