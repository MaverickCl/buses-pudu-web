import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registry from './pages/Registry';
import NotFound from './pages/404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/registro' element={<Registry/>} />
        <Route element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
