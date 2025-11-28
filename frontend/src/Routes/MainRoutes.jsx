// import Home from '@/Pages/Home'
import Login from '@/Pages/Auth/Login'
import Register from '@/Pages/Auth/Register'
import Home from '@/Pages/User/Home'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectRoute } from './ProtectedRoutes'
import Cart from '@/Pages/User/Cart'
import Product from '@/Pages/User/Product'
import SearchPage from '@/Pages/SearchPage'
import SingleProduct from '@/Pages/User/SingleProduct'
import Purchase from '@/Pages/User/Purchase'

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
        <Route path='/product/:id' element={
          <ProtectRoute>
            <SingleProduct/>
          </ProtectRoute>
        } />
        <Route path='/cart' element={
          <ProtectRoute>
            <Cart/>
          </ProtectRoute>
        } />
        <Route path='/search' element={
          <ProtectRoute>
            <SearchPage/>
          </ProtectRoute>
        } />
        <Route path='/purchase' element={
          <ProtectRoute>
            <Purchase/>
          </ProtectRoute>
        } />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default MainRoutes