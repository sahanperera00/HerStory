import "./App.css";
import { Routes, Route } from "react-router-dom";
import Forum from "./pages/Forum/Forum";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Forum /> */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
