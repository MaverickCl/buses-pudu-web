import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminEdit } from '../pages/AdminEdit'
import { AdminUserAdd } from '../pages'
import Dashboard from '../pages/Dashboard'



export const AdminRoutes = () => {
  return (
    <Routes >
        <Route path="/*" element={<Dashboard/>} />
        <Route path="/edit/*" element={<AdminEdit />} />
        <Route path="/create/*" element={<AdminUserAdd />} />
    </Routes>
  )
}
