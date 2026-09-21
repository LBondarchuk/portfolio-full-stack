import { Outlet } from "react-router";
import SideBar from "../features/todo/components/SideBar/SideBar";

const DashboardLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-4 md:grid-cols-[250px_1fr]">
      <SideBar />

      <main className="min-h-screen bg-background p-8">
        <div className="h-full rounded-2xl bg-surface p-8 shadow-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;