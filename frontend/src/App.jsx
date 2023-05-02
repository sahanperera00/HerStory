import "./App.css";
import { Routes, Route } from "react-router-dom";
import Forum from "./pages/Forum/Forum";
import Community from "./pages/Forum/Community";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import ManageConsultants from "./pages/AdminDashboard/ManageConsultants";
import CategoryManagement from "./pages/AdminDashboard/CategoryManagement";
import ForumPost from "./pages/Forum/ForumPost";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/community" element={<Community />} />
        <Route path="/post" element={<ForumPost />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/manage-consultants"
          element={<ManageConsultants />}
        />
        <Route
          path="/admin/category-management"
          element={<CategoryManagement />}
        />
        <Route path="/admin/manage-forum" element={<Forum />} />
      </Routes>
    </div>
  );
}

export default App;
