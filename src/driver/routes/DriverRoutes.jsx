import { Navigate, Route, Routes } from "react-router-dom";
import TicketReadingPage from "../pages/TicketReadingPage";
import { Itinerario } from "../pages/Itinerario";

export const DriverRoutes = () => {
  return (
    <Routes>
      <Route path="/leer-qr" element={<TicketReadingPage />} />

      <Route path="/*" element={<Itinerario/>} />
    </Routes>
  );
};
