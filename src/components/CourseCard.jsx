 import { Link } from "react-router-dom";
import "./CourseCard.css";

const DIFFICULTY_STEPS = { Beginner: 1, Intermediate: 2, Advanced: 3 };

export default function CourseCard({ course, index }) {
  const steps = DIFFICULTY_STEPS[course.difficulty] || 1;

  return (
    <Link to={`/course/${course.id}`} className="course-card">
      <div className="course-card-marker">
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="course-card-body">
        <div className="course-card-head">
          <h3>{course.name}</h3>
          <div className="difficulty-dots" aria-label={`Difficulty: ${course.difficulty}`}>
            {[1, 2, 3].map((n) => (
              <span key={n} className={n <= steps ? "dot filled" : "dot"} />
            ))}
          </div>
        </div>
        {course.description && <p className="course-card-desc">{course.description}</p>}
        {course.category && <span className="tag">{course.category}</span>}
      </div>
    </Link>
  );
}
