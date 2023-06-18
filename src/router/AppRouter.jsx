import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { ClientRoutes } from "../client/routes/ClientRoutes";
import { BusRoutes } from "../buses/routes/BusRoutes";
import { TripRoutes } from "../trips/routes/TripRoutes";
//import { NotFound } from './pages/404';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* LandingPage */}
      <Route path="/*" element={<ClientRoutes />} />

      {/* Creacion de buses*/}
      <Route path="/bus/*" element={<BusRoutes />} />

      {/* Creacion de Viajes*/}
      <Route path="/viaje/*" element={<TripRoutes />} />
    </Routes>
  );
};
