import { Outlet } from "react-router";
import { useState } from "react";

import SideBar from "../components/SideBar/SideBar";
import TopBar from "../components/TopBar/TopBar";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)]">
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="grid min-w-0 grid-rows-[4rem_1fr] bg-background">
          <TopBar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
