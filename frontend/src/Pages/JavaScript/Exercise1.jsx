import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "../../Components/Button/Button";
import { runJavaScriptExercise1 } from "../../services/javascriptExercises";
import "./Exercise1.css";

export default function Exercise1() {
  const code = `
    [
      { userId: "u1", amount: 100 },
      { userId: "u2", amount: -50 },
      { userId: "u1", amount: -30 },
      { userId: "u3", amount: 200 },
      { userId: "u2", amount: 70 }
    ]
  `;
  const [userCode, setUserCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function runExercise(codeToRun) {
    setError("");
    setResult(null);

    try {
      const data = await runJavaScriptExercise1(codeToRun);

      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h1>Exercise 1</h1>
      <div className="exercise-code-layout">
        <div className="exercise-code-panel">
          <SyntaxHighlighter
            customStyle={{ minWidth: "420px" }}
            language="javascript"
            style={coy}
          >
            {code}
          </SyntaxHighlighter>
          <Button onClick={() => runExercise(code)}>Run</Button>
        </div>
        <div className="exercise-code-panel">
          <textarea
            className="code-editor"
            onChange={(event) => setUserCode(event.target.value)}
            spellCheck="false"
            value={userCode}
            placeholder="// Input your code here"
          />
          <Button onClick={() => runExercise(userCode)}>Run</Button>
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
                <th>Balance</th>
                <th>Is Negative</th>
              </tr>
            </thead>
            <tbody>
              {result.users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.balance}</td>
                  <td>{user.isNegative ? "true" : "false"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
