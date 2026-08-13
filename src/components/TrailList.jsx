import CourseCard from "./CourseCard";
import "./TrailList.css";

// Renders courses as waypoints along a dashed trail line — the visual
// signature of the app: learning a skill is walking a marked route.
export default function TrailList({ courses }) {
  return (
    <div className="trail-list">
      <svg className="trail-line" width="2" preserveAspectRatio="none" aria-hidden="true">
        <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--line)" strokeWidth="2" strokeDasharray="1 8" strokeLinecap="round" />
      </svg>
      <ol>
        {courses.map((course, i) => (
          <li key={course.id}>
            <CourseCard course={course} index={i} />
          </li>
        ))}
      </ol>
    </div>
  );
}
