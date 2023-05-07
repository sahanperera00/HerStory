import "./App.css";
import { Routes, Route } from "react-router-dom";
import Forum from "./pages/Forum/Forum";
import PostManagement from "./pages/AdminDashboard/PostManagement";
import CommunityManagement from "./pages/AdminDashboard/CommunityManagement";
import Community from "./pages/Forum/Community";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import ConsultantManagement from "./pages/AdminDashboard/ConsultantManagement";
import CategoryManagement from "./pages/AdminDashboard/CategoryManagement";
import ForumPost from "./pages/Forum/ForumPost";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
import ComplaintManagement from "./pages/AdminDashboard/ComplaintManagement";
import RequestsManagement from "./pages/AdminDashboard/RequestsManagement";
import ManageAppointments from "./pages/CounsellorDashboard/ManageAppointments";
import PendingRequests  from "./pages/CounsellorDashboard/PendingRequests";
import Chats from "./pages/CounsellorDashboard/Chats";
import Transfers from "./pages/CounsellorDashboard/Transfers";
import Feedbacks from "./pages/CounsellorDashboard/Feedbacks";


// chanu add here

// Devs add here

// Nash add here

// Shagg add here
import ConsultantSignup from "./pages/ConsultantSignup/ConsultantSignup";
import ClientSignup from "./pages/ClientSignup/ClientSignup";
import Login from "./pages/Login/Login";
import CounsellorDashboard from "./pages/CounsellorDashboard/CounsellorDashboard";
import ClientUpdatePage from "./pages/ClientDashboard/ClientUpdatePage";
import ContactSupport from "./pages/ClientDashboard/ContactSupport";
import ClientComplaint from "./pages/ClientDashboard/ClientComplaint";












































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
          element={<ConsultantManagement />}
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
        <Route
          path="/admin/complaint-management"
          element={<ComplaintManagement />}
        />

        {/* Devs add here */}
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/updateClient" element={<ClientUpdatePage/>}/>
        <Route path="/client/support" element={<ContactSupport/>}/>
        <Route path="/client/complaint" element={<ClientComplaint/>}/>





























































































        {/* Nash add here */}

        {/* Shagg add here */}
        <Route path="/consultant-signup" element={<ConsultantSignup />} />
        <Route path="/client-signup" element={<ClientSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/manage-requests" element={<RequestsManagement />} />
        <Route path="/counsellor-dashboard" element={<CounsellorDashboard />} />
        <Route
          path="/counsellor/manage-appointments"
          element={<ManageAppointments />}
        />
        <Route
          path="/counsellor/pending-requests"
          element={<PendingRequests />}
        />
        <Route path="/counsellor/chats" element={<Chats />} />
        <Route path="/counsellor/transfers" element={<Transfers />} />
        <Route path="/counsellor/feedbacks" element={<Feedbacks />} />
      </Routes>
    </div>
  );
}

export default App;
