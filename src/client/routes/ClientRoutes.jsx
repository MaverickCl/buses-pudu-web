import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Registry from '../pages/Registry'


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
