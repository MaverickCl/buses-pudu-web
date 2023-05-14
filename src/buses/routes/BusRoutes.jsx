import { Navigate, Route, Routes } from "react-router-dom"
import CreacionBusPage from "../pages/CreacionBusPage"
import LoginPage from "../../auth/pages/LoginPage"

export const BusRoutes = () => {
  return (
    <Routes>

        <Route path="/crear-bus" element={ <CreacionBusPage /> } />

        <Route path="/*" element={ <Navigate to="/auth/login"/> } />

    </Routes>
  )
}
