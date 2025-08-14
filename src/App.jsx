import React from "react";
import { Routes, Route } from 'react-router-dom'

import Home from '../src/assets/pages/home/Home'
import Navigation from '../src/assets/components/navigation/Navigation'

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/home' element={<Home />} />
      </Routes>
   </div>
  )
 
}

export default App;
