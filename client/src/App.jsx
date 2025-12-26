import React from "react";
import { Routes, Route } from 'react-router-dom'

import Home from '../src/assets/pages/home/Home'
import Info from '../src/assets/pages/info/Info'
import Navigation from '../src/assets/components/navigation/Navigation'

function App() {

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/info' element={<Info />} />
      </Routes>
   </div>
  )
 
}

export default App;
