import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import SideMenu from "./Components/SideMenu/SideMenu";
import Home from "./Pages/Home";
import JSExercise1 from "./Pages/JavaScript/Exercise1/Exercise1";
import JSExercise2 from "./Pages/JavaScript/Exercise1/Exercise2";
import MongoExercise1 from "./Pages/Mongo/Exercise1";
import MongoExercise2 from "./Pages/Mongo/Exercise2";
import MongoExercise3 from "./Pages/Mongo/Exercise3";
import "./styles.css";

const pages = {
  home: <Home />,
  "javascript-exercise-1": <JSExercise1 />,
  "javascript-exercise-2": <JSExercise2 />,
  "mongodb-exercise-1": <MongoExercise1 />,
  "mongodb-exercise-2": <MongoExercise2 />,
  "mongodb-exercise-3": <MongoExercise3 />,
};

function getCurrentPage() {
  const hash = window.location.hash.replace("#", "");

  return pages[hash] ? hash : "home";
}

function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    function handleHashChange() {
      setCurrentPage(getCurrentPage());
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="app-layout">
      <SideMenu currentPage={currentPage} />
      <main>{pages[currentPage]}</main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
