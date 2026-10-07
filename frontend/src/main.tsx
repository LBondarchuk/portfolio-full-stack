import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import TodoPage from "./pages/dashboard/todo/TodoPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage/DashboardPage.tsx";
import TodoAnalyticsPage from "./pages/dashboard/todo/analytics/AnalyticsPage.tsx";
import Page2048 from "./pages/dashboard/Page2048/Page2048.tsx";
import EventsPage from "./pages/dashboard/DashboardPage/EventsPage/EventsPage.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./features/theme/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/todo" element={<TodoPage />} />
            <Route
              path="/dashboard/todo/analytics"
              element={<TodoAnalyticsPage />}
            />
            <Route path="/dashboard/2048" element={<Page2048 />} />
            <Route path="/dashboard/events" element={<EventsPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
        />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
