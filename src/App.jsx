import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import ShortestPath from "./pages/ShortestPath";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/shortest-path" element={<ShortestPath />} />
        </Routes>
      </main>
    </>
  );
}
