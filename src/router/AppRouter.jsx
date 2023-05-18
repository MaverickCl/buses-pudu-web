import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { ClientRoutes } from "../client/routes/ClientRoutes";
import { AdminRoutes } from "../admin/routes/AdminRoutes";
//import { NotFound } from './pages/404';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* LandingPage */}
      <Route path="/*" element={<ClientRoutes />} />

      {/* Admin */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};
