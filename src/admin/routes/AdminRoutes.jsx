import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from '../pages/Dashboard'



export const AdminRoutes = () => {
  return (
    <Routes >
        <Route path="/*" element={<DashBoard />} />

    </Routes>
  )
}
