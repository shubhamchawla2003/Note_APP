import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
