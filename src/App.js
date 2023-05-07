import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Routes/Home';
import AdminPannel from './Routes/AdminPannel';


function App() {
  return (
    <Router>
      <Routes>
         
        <Route exact path='/admin' element={<AdminPannel />} />
         
        <Route exact path='/' element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;
