import { useEffect, useState } from "react";
import { getUserSpending } from "../../services/mongodbExercises";
import "./Exercise1.css";

export default function Exercise1() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadResults() {
      try {
        const data = await getUserSpending();

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
      <h1>MongoDB Exercise 1</h1>
      {isLoading && <p>Loading results...</p>}
      {error && <p className="mongo-exercise-error">{error}</p>}
      {!isLoading && !error && results.length === 0 && <p>No results found.</p>}
      {!isLoading && !error && results.length > 0 && (
        <table className="mongo-exercise-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Total Orders</th>
              <th>Total Amount Spent</th>
            </tr>
          </thead>
          <tbody>
            {results.map((user) => (
              <tr key={user.userName}>
                <td>{user.userName}</td>
                <td>{user.totalOrders}</td>
                <td>{user.totalAmountSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
