import "./App.css";
import { Routes, Route } from "react-router-dom";
import Forum from "./pages/Forum/Forum";
import ForumManagement from "./pages/AdminDashboard/ForumManagement";
import Community from "./pages/Forum/Community";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import ManageConsultants from "./pages/AdminDashboard/ManageConsultants";
import CategoryManagement from "./pages/AdminDashboard/CategoryManagement";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/community" element={<Community />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/manage-consultants"
          element={<ManageConsultants />}
        />
        <Route
          path="/admin/category-management"
          element={<CategoryManagement />}
        />
        <Route path="/admin/manage-forum" element={<ForumManagement />} />
      </Routes>
    </div>
  );
}

export default App;
