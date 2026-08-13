import "./VideoList.css";

export default function VideoList({ videos }) {
  if (!videos || videos.length === 0) {
    return <p className="video-empty">No resources linked to this course yet.</p>;
  }

  return (
    <ul className="video-list">
      {videos.map((video, i) => (
        <li key={video.url || i}>
          <a href={video.url} target="_blank" rel="noreferrer" className="video-item">
            <span className="video-play" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M2 1 L11 6 L2 11 Z" fill="var(--bg)" />
              </svg>
            </span>
            <span className="video-meta">
              <span className="video-title">{video.title}</span>
              <span className="video-sub">
                {video.platform}
                {video.duration ? ` · ${video.duration}` : ""}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
