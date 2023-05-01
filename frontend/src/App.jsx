import "./App.css";
import { Routes, Route } from "react-router-dom";
import Forum from "./pages/Forum/Forum";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Forum /> */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Sahan's Routes */}














        {/* Devindu's Routes */}

        <Route path="/client" element={<ClientDashboard />} />












        {/* Nashali's Routes */}

        













        {/* Chanukya's Routes */}

















      </Routes>
    </div>
  );
}

export default App;
