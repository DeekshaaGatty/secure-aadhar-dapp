import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import UserMenu from './Pages/UserMenu'
import InstitutionMenu from './Pages/InstitutionMenu'
import NotFound from './Pages/NotFound'
import LoginPage from './Pages/LoginPage'

function App() {
  return (
    <div>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usermenu" element={<UserMenu />} />
          <Route path="/institutionmenu" element={<InstitutionMenu />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
