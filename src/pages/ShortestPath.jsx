import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingState, EmptyState, ErrorState } from "../components/StatusStates";
import { getCourses, getShortestPath } from "../api/courses";
import "./ShortestPath.css";

export default function ShortestPath() {
  const [courses, setCourses] = useState([]);
  const [listStatus, setListStatus] = useState("loading");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState(null);
  const [queryStatus, setQueryStatus] = useState("idle"); // idle | loading | ready | error | empty

  useEffect(() => {
    setListStatus("loading");
    getCourses()
      .then((data) => {
        setCourses(data);
        setListStatus("ready");
      })
      .catch(() => setListStatus("error"));
  }, []);

  const runQuery = (e) => {
    e.preventDefault();
    if (!from || !to) return;
    setQueryStatus("loading");
    getShortestPath(from, to)
      .then((data) => {
        if (!data || data.length === 0) {
          setQueryStatus("empty");
        } else {
          setResult(data);
          setQueryStatus("ready");
        }
      })
      .catch(() => setQueryStatus("error"));
  };

  return (
    <div className="sp-page">
      <header className="sp-head">
        <span className="eyebrow">Two points, one route</span>
        <h1>Shortest path between skills</h1>
        <p className="sp-sub">
          Pick a starting course and a destination — see the shortest chain
          of prerequisites connecting them, however far apart they are.
        </p>
      </header>

      {listStatus === "loading" && <LoadingState label="Loading the map" />}
      {listStatus === "error" && (
        <ErrorState message="Couldn't load the course list." />
      )}

      {listStatus === "ready" && (
        <form className="sp-form" onSubmit={runQuery}>
          <label>
            <span>From</span>
            <select value={from} onChange={(e) => setFrom(e.target.value)} required>
              <option value="" disabled>
                Choose a course
              </option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <span className="sp-form-arrow" aria-hidden="true">&rarr;</span>

          <label>
            <span>To</span>
            <select value={to} onChange={(e) => setTo(e.target.value)} required>
              <option value="" disabled>
                Choose a course
              </option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="sp-submit">
            Find route
          </button>
        </form>
      )}

      <section className="sp-result">
        {queryStatus === "loading" && <LoadingState label="Plotting the shortest route" />}

        {queryStatus === "error" && (
          <ErrorState message="Couldn't find a route right now." onRetry={runQuery} />
        )}

        {queryStatus === "empty" && (
          <EmptyState
            title="No path connects these two"
            hint="They may belong to entirely separate trees of knowledge."
          />
        )}

        {queryStatus === "ready" && result && (
          <ol className="sp-chain">
            {result.map((step, i) => (
              <li key={step.id}>
                <Link to={`/course/${step.id}`} className="sp-step">
                  {step.name}
                </Link>
                {i < result.length - 1 && <span className="sp-arrow">&rarr;</span>}
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
