import React from 'react'
import { Itinerario } from '../pages/Itinerario'
import { Route, Routes } from 'react-router-dom'

export const DriverRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Itinerario />} />
      

      {/* <Route path="" element={<Navigate to="/" />} /> */}

      
    </Routes>
  )
}
