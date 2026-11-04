import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Science from "./pages/Science.jsx";
import Business from "./pages/Business.jsx";
import Registration from "./pages/Registration.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/science" element={<Science />} />
        <Route path="/business" element={<Business />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
