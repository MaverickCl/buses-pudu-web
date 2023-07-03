import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminEdit } from '../pages/AdminEdit'
import { AdminUserAdd } from '../pages'
import Dashboard from '../pages/Dashboard'
import { Eliminacion } from '../pages/Eliminacion'



export const AdminRoutes = () => {
  return (
    <Routes >
        <Route path="/*" element={<Dashboard/>} />
        <Route path="/edit/*" element={<AdminEdit />} />
        <Route path="/delete/*" element={<Eliminacion />} />
        <Route path="/create/*" element={<AdminUserAdd />} />
    </Routes>
  )
}
