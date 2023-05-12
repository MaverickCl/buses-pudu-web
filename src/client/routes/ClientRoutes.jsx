import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import PuduPoints from "../pages/PuduPoints";
import Profile from "../pages/Profile";
import TicketManagement from "../pages/TicketManagement";
import Search from "../pages/Search";

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/*" element={<Navigate to="/" />} />

      <Route path="/pudu-points" element={<PuduPoints />} />

      <Route path="/perfil" element={<Profile />} />

      <Route path="/gestion-tickets" element={<TicketManagement />} />

      <Route path="/busqueda" element={<Search />} />
    </Routes>
  );
};
