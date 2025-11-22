// import Home from '@/Pages/Home'
import Login from '@/Pages/Auth/Login'
import Register from '@/Pages/Auth/Register'
import Home from '@/Pages/User/Home'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectRoute } from './ProtectedRoutes'
import Cart from '@/Pages/User/Cart'
import Product from '@/Pages/User/Product'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={
          <ProtectRoute>
            <Home/>
          </ProtectRoute>
        } />
        <Route path='/product' element={
          <ProtectRoute>
            <Product/>
          </ProtectRoute>
        } />
        <Route path='/cart' element={
          <ProtectRoute>
            <Cart/>
          </ProtectRoute>
        } />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default MainRoutes