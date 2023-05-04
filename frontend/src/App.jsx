import "./App.css";
import { Routes, Route } from "react-router-dom";
import Forum from "./pages/Forum/Forum";
import PostManagement from "./pages/AdminDashboard/PostManagement";
import CommunityManagement from "./pages/AdminDashboard/CommunityManagement";
import Community from "./pages/Forum/Community";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import ManageConsultants from "./pages/AdminDashboard/ManageConsultants";
import CategoryManagement from "./pages/AdminDashboard/CategoryManagement";
import ForumPost from "./pages/Forum/ForumPost";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
// chanu add here






































// Devs add here












































// Nash add here













































// Shagg add here
import ConsultantSignup from "./pages/ConsultantSignup/ConsultantSignup";
import ClientSignup from "./pages/ClientSignup/ClientSignup";
import Login from "./pages/Login/Login";
import CounsellorDashboard from "./pages/CounsellorDashboard/CounsellorDashboard";












































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

        {/* chanu add here */}
        <Route path="/admin/manage-post" element={<PostManagement />} />
        <Route
          path="/admin/manage-community"
          element={<CommunityManagement />}
        />


































        
        {/* Devs add here */}
        <Route path="/client" element={<ClientDashboard />} />






























































































        {/* Nash add here */}



























































































        {/* Shagg add here */}
        <Route path="/consultant-signup" element={<ConsultantSignup />} />
        <Route path="/client-signup" element={<ClientSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/counsellor-dashboard" element={<CounsellorDashboard />} />












































































































      </Routes>
    </div>
  );
}

export default App;
