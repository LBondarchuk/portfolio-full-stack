import { Outlet } from "react-router";
import { useState } from "react";

import SideBar from "../components/SideBar/SideBar";
import TopBar from "../components/TopBar/TopBar";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[250px_1fr] ">
        <SideBar isOpen={isSidebarOpen} />

        <main className="grid grid-rows-[auto_1fr] gap-2 min-h-full bg-background    box-border">
          <TopBar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="p-4 lg:p-8">

          <div className="h-full rounded-2xl bg-surface p-4 shadow-sm ">
            <Outlet />
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
