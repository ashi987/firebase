import { useState } from 'react'
import Register from './Component/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import Dashboard from './Component/Dashboard'




function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
