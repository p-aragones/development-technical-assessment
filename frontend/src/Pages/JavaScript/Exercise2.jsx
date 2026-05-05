import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "../../Components/Button/Button";
import { runJavaScriptExercise2 } from "../../services/javascriptExercises";
import "./Exercise2.css";

export default function Exercise2() {
  const code = `
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
  `;
  const newCode = `
    function getTopUsers(transactions) {
      const totals = {};

      for (const t of transactions) {
        if (!totals[t.userId]) {
          totals[t.userId] = 0;
        }
        totals[t.userId] += t.amount;
      }

      return Object.entries(totals).map(([userId, total]) => ({
        userId: Number(userId),
        total
      }));
    }
  `;
  const [users, setUsers] = useState(5);
  const [transactions, setTransactions] = useState(10);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function runExercise(code) {
    setError("");
    setResult(null);

    try {
      const data = await runJavaScriptExercise2(code, users, transactions);

      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h1>Exercise 2</h1>
      <div className="transactions">
        <label htmlFor="users">Number of users:</label>
        <input
          id="users"
          min="1"
          name="users"
          onChange={(event) => setUsers(Number(event.target.value))}
          type="number"
          value={users}
        />
        <label htmlFor="transactions">Number of transactions:</label>
        <input
          id="transactions"
          min="1"
          name="transactions"
          onChange={(event) => setTransactions(Number(event.target.value))}
          type="number"
          value={transactions}
        />
      </div>
      <div className="exercise-code-layout">
        <div className="exercise-code-panel">
        <p>Original code</p>
          <SyntaxHighlighter
            customStyle={{ minWidth: "700px", minHeight: "460px" }}
            language="javascript"
            style={coy}
          >
            {code}
          </SyntaxHighlighter>
          <Button onClick={() => runExercise(1)}>Run</Button>
        </div>
        <div className="exercise-code-panel">
        <p>New code</p>
          <SyntaxHighlighter
            customStyle={{ minWidth: "700px", minHeight: "460px" }}
            language="javascript"
            style={coy}
          >
            {newCode}
          </SyntaxHighlighter>
          <Button onClick={() => runExercise(2)}>Run</Button>
        </div>
      </div>
      {error && <p className="exercise-error">{error}</p>}
      {result && (
        <div className="exercise-result">
          <p>
            {result.message} in {result.durationInSeconds.toFixed(6)}s
          </p>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {result.result.map((user, index) => (
                <tr key={`${user.userId}-${index}`}>
                  <td>{user.userId}</td>
                  <td>{user.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
