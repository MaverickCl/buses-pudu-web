import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from '../pages/Dashboard'
import { AdminEdit } from '../pages/AdminEdit'
import { AdminUserAdd } from '../pages'



export const AdminRoutes = () => {
  return (
    <Routes >
        <Route path="/*" element={<DashBoard />} />
        <Route path="/edit/*" element={<AdminEdit />} />
        <Route path="/create/*" element={<AdminUserAdd />} />
    </Routes>
  )
}
