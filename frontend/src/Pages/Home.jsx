import { useEffect, useMemo, useState } from "react";
import { getUsersBalance } from "../services/users.js";
import Button from "../Components/Button/Button.jsx";
import "./Home.css";

export default function Home() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [minBalance, setMinBalance] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const [sortBy, setSortBy] = useState("balance");
  const [sortDirection, setSortDirection] = useState("desc");

  async function loadResults() {
    try {
      setIsLoading(true);

      const data = await getUsersBalance(
        minBalance === "" ? null : Number(minBalance)
      );

      setResults(data);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadResults();
  }, []);

  const filteredResults = useMemo(() => {
    let filtered = [...results];

    filtered = filtered.filter((user) =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase())
    );

    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "balance") {
        comparison = a.balance - b.balance;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [results, nameFilter, sortBy, sortDirection]);

  function toggleSort(field) {
    if (sortBy === field) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  }

  return (
    <>
      <h1>Home</h1>
      <div>
        <input
          id="balance"
          name="balance"
          type="number"
          placeholder="Minimum balance"
          value={minBalance}
          onChange={(event) => setMinBalance(event.target.value)}
        />
        <Button onClick={loadResults}>Filter By Minimum Balance</Button>
      </div>
      <input
        id="nameFilter"
        name="nameFilter"
        type="text"
        placeholder="Filter by username"
        value={nameFilter}
        onChange={(event) =>
          setNameFilter(event.target.value)
        }
      />
      {isLoading && <p>Loading results...</p>}
      {error && (
        <p className="mongo-exercise-error">
          {error}
        </p>
      )}
      {!isLoading &&
        !error &&
        filteredResults.length === 0 && (
          <p>No results found.</p>
        )}
      {!isLoading &&
        !error &&
        filteredResults.length > 0 && (
          <table className="mongo-exercise-table">
            <thead>
              <tr>
                <th
                  onClick={() => toggleSort("name")}
                  style={{ cursor: "pointer" }}
                >
                  User Name
                </th>
                <th
                  onClick={() => toggleSort("balance")}
                  style={{ cursor: "pointer" }}
                >
                  Total Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((user) => (
                <tr key={user.userId}>
                  <td>{user.name}</td>
                  <td>{user.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  );
}
