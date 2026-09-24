import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
// import MainLayout from "./layouts/MainLayout.tsx";
import TodoPage from "./pages/dashboard/todo/TodoPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage/DashboardPage.tsx";
import TodoAnalyticsPage from "./pages/dashboard/todo/analytics/AnalyticsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/dashboard/todo" element={<TodoPage />} />
          <Route path="/dashboard/todo/analytics" element={<TodoAnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
