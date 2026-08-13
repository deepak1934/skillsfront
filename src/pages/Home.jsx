import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import TrailList from "../components/TrailList";
import { LoadingState, EmptyState, ErrorState } from "../components/StatusStates";
import { getFeaturedCourses } from "../api/courses";
import "./Home.css";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const load = () => {
    setStatus("loading");
    getFeaturedCourses()
      .then((data) => {
        setCourses(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(load, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q)
    );
  }, [courses, query]);

  return (
    <div className="home-page">
      <section className="home-hero">
        <span className="eyebrow">Pick a destination</span>
        <h1>Find the route to any skill.</h1>
        <p className="home-sub">
          Search a subject and see exactly what to learn first — the
          waypoints between where you are and where you're headed.
        </p>
        <SearchBar value={query} onChange={setQuery} />
      </section>

      <section className="home-list">
        {status === "loading" && <LoadingState label="Surveying the map" />}

        {status === "error" && (
          <ErrorState
            message="Couldn't load the course map. Is the backend running?"
            onRetry={load}
          />
        )}

        {status === "ready" && filtered.length === 0 && (
          <EmptyState
            title="No routes match that search"
            hint="Try a different subject or clear the search."
          />
        )}

        {status === "ready" && filtered.length > 0 && <TrailList courses={filtered} />}
      </section>
    </div>
  );
}