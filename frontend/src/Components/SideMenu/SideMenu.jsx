import "./SideMenu.css";

export default function SideMenu({ currentPage }) {
  return (
    <aside className="side-menu">
      <nav aria-label="Main navigation">
        <a className={currentPage === "home" ? "active" : ""} href="#home">
          Home
        </a>

        <p className="side-menu-title">
          JavaScript {"\u2014"} Data Processing & Algorithms
        </p>
        <a
          className={currentPage === "javascript-exercise-1" ? "active" : ""}
          href="#javascript-exercise-1"
        >
          Exercise 1
        </a>
        <a
          className={currentPage === "javascript-exercise-2" ? "active" : ""}
          href="#javascript-exercise-2"
        >
          Exercise 2
        </a>

        <p className="side-menu-title">
          MongoDB {"\u2014"} Aggregation Pipelines
        </p>
        <a
          className={currentPage === "mongodb-exercise-1" ? "active" : ""}
          href="#mongodb-exercise-1"
        >
          Exercise 1
        </a>
        <a
          className={currentPage === "mongodb-exercise-2" ? "active" : ""}
          href="#mongodb-exercise-2"
        >
          Exercise 2
        </a>
        <a
          className={currentPage === "mongodb-exercise-3" ? "active" : ""}
          href="#mongodb-exercise-3"
        >
          Exercise 3
        </a>
      </nav>
    </aside>
  );
}
