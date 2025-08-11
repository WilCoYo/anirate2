import React from "react";
import { Routes, Route } from 'react-router-dom'

import Login from '../src/assets/pages/login/Login'
import Home from '../src/assets/pages/home/Home'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
   </div>
  )
 
}

export default App;
