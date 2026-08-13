import client from "./client";

// GET /courses/featured — the destination skills shown on the home page.
export const getFeaturedCourses = () =>
  client.get("/courses/featured").then((res) => res.data);

// GET /courses — every course, used by the shortest-path pickers.
export const getCourses = () => client.get("/courses").then((res) => res.data);

// GET /courses/:id — a single course's own details
export const getCourse = (id) =>
  client.get(`/courses/${id}`).then((res) => res.data);

// GET /courses/:id/path — the full prerequisite chain leading to this course
export const getCoursePath = (id) =>
  client.get(`/courses/${id}/path`).then((res) => res.data);

// GET /courses/:id/unlocks — what becomes available after this course
export const getCourseUnlocks = (id) =>
  client.get(`/courses/${id}/unlocks`).then((res) => res.data);

// GET /courses/:id/videos — curated resources for this course
export const getCourseVideos = (id) =>
  client.get(`/courses/${id}/videos`).then((res) => res.data);

// GET /path?from=&to= — shortest path between two courses
export const getShortestPath = (from, to) =>
  client
    .get("/path", { params: { from, to } })
    .then((res) => res.data);