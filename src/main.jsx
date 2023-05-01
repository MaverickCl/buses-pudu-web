import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { BusesApp } from './BusesApp.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <BusesApp/>
    </BrowserRouter>
  </React.StrictMode>,
)
