import { useEffect, useState } from "react";
import { getTransactionMismatch } from "../../services/mongodbExercises";
import "./Exercise1.css";

export default function Exercise2() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadResults() {
      try {
        const data = await getTransactionMismatch();

        setResults(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadResults();
  }, []);

  return (
    <>
      <h1>MongoDB Exercise 2</h1>
      {isLoading && <p>Loading results...</p>}
      {error && <p className="mongo-exercise-error">{error}</p>}
      {!isLoading && !error && results.length === 0 && <p>No results found.</p>}
      {!isLoading && !error && results.length > 0 && (
        <table className="mongo-exercise-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Transaction ID</th>
              <th>Transaction amount</th>
              <th>Order ID</th>
              <th>Order Amount</th>
            </tr>
          </thead>
          <tbody>
            {results.map((t) => (
              <tr key={t.transactionId}>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.transactionId}</td>
                <td>${t.transactionAmount}</td>
                <td>{t.orderId}</td>
                <td>${t.orderAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
