import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from '../pages'

export const ClientRoutes = () => {
  return (
    <Routes>

        <Route path='/' element={ <LandingPage/> }/>

        <Route path='/*' element={ <Navigate to="/"/> }/>

    </Routes>
  )
}
