import { Navigate, Route, Routes } from "react-router-dom";
import TicketReadingPage from "../pages/TicketReadingPage";

export const DriverRoutes = () => {
  return (
    <Routes>
      <Route path="/leer-qr" element={<TicketReadingPage />} />

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
