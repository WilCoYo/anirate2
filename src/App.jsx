import React from "react";
import Login from '../src/assets/pages/login/Login'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
   </div>
  )
 
}

export default App;
