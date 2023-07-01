import { Navigate, Route, Routes } from "react-router-dom";
import CreateTripPage from "../pages/CreateTripPage";

export const TripRoutes = () => {
  return (
    <Routes>
      <Route path="/crear-viaje" element={<CreateTripPage />} />

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
