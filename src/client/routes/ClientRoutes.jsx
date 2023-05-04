import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage, Registry } from '../pages'

export const ClientRoutes = () => {
  return (
    <Routes>

        <Route path='/' element={ <LandingPage/> }/>

        <Route path='/*' element={ <Navigate to="/"/> }/>

        {/* SignUpPage */}
        <Route path='/registro' element={<Registry/>} />

    </Routes>
  )
}
