import SideBar2 from "@/components/SideBar2";
import { Outlet } from "react-router"; // For rendering nested routes

const Dashboard = () => {
  return (
    <div className="h-screen flex">
      <SideBar2 /> {/* Sidebar with links */}
        {/* Outlet for rendering nested routes like /dashboard/chatbot */}
        <Outlet />
    </div>
  );
};

export default Dashboard;