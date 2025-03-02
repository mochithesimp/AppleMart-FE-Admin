import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState } from "react";
import "./Admin.css";

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="admin-container">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`admin-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
