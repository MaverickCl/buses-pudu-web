import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Registry from "../pages/Registry";
import PuduPoints from "../pages/PuduPoints";
import Profile from "../pages/Profile";
import TicketManagement from "../pages/TicketManagement";

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/*" element={<Navigate to="/" />} />

      {/* SignUpPage */}
      <Route path="/registro" element={<Registry />} />

      <Route path="/pudu-points" element={<PuduPoints />} />

      <Route path="/perfil" element={<Profile />} />

      <Route path="/gestion-tickets" element={<TicketManagement />} />
    </Routes>
  );
};
