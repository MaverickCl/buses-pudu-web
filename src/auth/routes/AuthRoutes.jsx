import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Registry from "../pages/Registry";

export const AuthRoutes = () => {
  return (
    <Routes>
      {/* SignUpPage */}
      <Route path="registro" element={<Registry />} />

      <Route path="login" element={<LoginPage />} />

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
