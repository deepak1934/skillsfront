import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoList from "../components/VideoList";
import { LoadingState, EmptyState, ErrorState } from "../components/StatusStates";
import { getCourse, getCoursePath, getCourseUnlocks, getCourseVideos } from "../api/courses";
import "./CourseDetail.css";

export default function CourseDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  const load = () => {
    setStatus("loading");
    Promise.all([getCourse(id), getCoursePath(id), getCourseUnlocks(id), getCourseVideos(id)])
      .then(([course, path, unlocks, videos]) => {
        setData({ course, path, unlocks, videos });
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(load, [id]);

  if (status === "loading") return <LoadingState label="Tracing the trail" />;
  if (status === "error")
    return (
      <ErrorState
        message="Couldn't load this course. It may not exist, or the backend is unreachable."
        onRetry={load}
      />
    );

  const { course, path, unlocks, videos } = data;

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        &larr; Back to all skills
      </Link>

      <header className="detail-head">
        <span className="eyebrow">{course.category}</span>
        <h1>{course.name}</h1>
        {course.description && <p className="detail-desc">{course.description}</p>}
        <span className="tag">{course.difficulty}</span>
      </header>

      <section className="detail-section">
        <h2>Prerequisite trail</h2>
        {path && path.length > 0 ? (
          <ol className="chain">
            {path.map((step, i) => (
              <li key={step.id}>
                <Link to={`/course/${step.id}`} className="chain-step">
                  {step.name}
                </Link>
                {i < path.length - 1 && <span className="chain-arrow">&rarr;</span>}
              </li>
            ))}
            <li>
              <span className="chain-step chain-current">{course.name}</span>
            </li>
          </ol>
        ) : (
          <EmptyState title="No prerequisites — this is a starting point" />
        )}
      </section>

      <section className="detail-section">
        <h2>What this unlocks</h2>
        {unlocks && unlocks.length > 0 ? (
          <ul className="unlock-list">
            {unlocks.map((u) => (
              <li key={u.id}>
                <Link to={`/course/${u.id}`}>{u.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Nothing builds on this yet" />
        )}
      </section>

      <section className="detail-section">
        <h2>Learn from</h2>
        <VideoList videos={videos} />
      </section>
    </div>
  );
}
