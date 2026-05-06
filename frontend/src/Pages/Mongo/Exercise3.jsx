import { useEffect, useState } from "react";
import { getRetriedTransactions } from "../../services/mongodbExercises";
import "./Exercise1.css";

export default function Exercise3() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadResults() {
      try {
        const data = await getRetriedTransactions();

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
      <h1>MongoDB Exercise 3</h1>
      {isLoading && <p>Loading results...</p>}
      {error && <p className="mongo-exercise-error">{error}</p>}
      {!isLoading && !error && results.length === 0 && <p>No results found.</p>}
      {!isLoading && !error && results.length > 0 && (
        <table className="mongo-exercise-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Transaction Number</th>
              <th>Most Recent Transaction Date</th>
              <th>Most Recent Transaction Status</th>
              <th>Recent Transaction ID</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((t) => (
              <tr key={t.orderId}>
                <td>{t.orderId}</td>
                <td>{t.totalTransactions}</td>
                <td>{t.mostRecentTransactionDate}</td>
                <td>{t.mostRecentTransactionStatus}</td>
                <td>{t.mostRecentTransactionId}</td>
                <td>{t.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
