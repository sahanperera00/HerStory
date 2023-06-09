import "./App.css";
import { Routes, Route } from "react-router-dom";
import Forum from "./pages/Forum/Forum";
import ForumSurvivor from "./pages/Forum/ForumSurvivor";
import PostManagement from "./pages/AdminDashboard/PostManagement";
import PostDateRange from "./pages/AdminDashboard/PostDateRange";
import CommunityManagement from "./pages/AdminDashboard/CommunityManagement";
import CommunityNew from "./pages/AdminDashboard/CommunityNew";
import Community from "./pages/Forum/Community";
import CommunityEdit from "./pages/AdminDashboard/CommunityEdit";
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



import ChatPage from "./pages/Chat/ChatPage";
import ClientComplaint from "./pages/ClientDashboard/ClientComplaint";
import ClientUpdatePage from "./pages/ClientDashboard/ClientUpdatePage";
import ContactSupport from "./pages/ClientDashboard/ContactSupport";

import ConsultantSignup from "./pages/ConsultantSignup/ConsultantSignup";
import ClientSignup from "./pages/ClientSignup/ClientSignup";
import Login from "./pages/Login/Login";
import CounsellorDashboard from "./pages/CounsellorDashboard/CounsellorDashboard";
import ClientForum from "./pages/Forum/ClientForum";
import Premium from "./pages/ClientDashboard/Premium";
import Counsel from "./pages/ClientDashboard/Counsel";

















































function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/myforum" element={<ClientForum />} />
        <Route path="/community" element={<Community />} />
        <Route path="/post/:postId" element={<ForumPost />} />

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
        <Route path ="admin/PostDateRange" element={<PostDateRange/>}/>
        <Route path="/forumSurvivor" element={<ForumSurvivor />} />
       
        <Route
          path="/admin/manage-community"
          element={<CommunityManagement />}
        />
        <Route
          path="/admin/complaint-management"
          element={<ComplaintManagement />}
        />
        <Route
          path="/admin/new-community"
          element={<CommunityNew />}
        />
        <Route
          path="/admin/CommunityEdit/:id"
          element={<CommunityEdit />}
        />

        {/* Devs add here */}
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/updateClient" element={<ClientUpdatePage/>}/>
        <Route path="/client/support" element={<ContactSupport/>}/>
        <Route path="/client/complaint" element={<ClientComplaint/>}/>
        <Route path='/chats' element={<ChatPage/>}/>
        <Route path="/client/premium" element={<Premium/>}/>





























































































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
        <Route path="/counsel" element={<Counsel />} />
      </Routes>
    </div>
  );
}

export default App;
