import { Navigate, Route, Routes } from "react-router-dom";
import CreateBusPage from "../pages/CreateBusPage";
import LoginPage from "../../auth/pages/LoginPage";

export const BusRoutes = () => {
  return (
    <Routes>
      <Route path="/crear-bus" element={<CreateBusPage />} />

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
