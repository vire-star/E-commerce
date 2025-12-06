// import Home from '@/Pages/Home'
import Login from '@/Pages/Auth/Login'
import Register from '@/Pages/Auth/Register'
import Home from '@/Pages/User/Home'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectRoute } from './ProtectedRoutes'
import Cart from '@/Pages/User/Cart'
import Product from '@/Pages/User/Product'

import SingleProduct from '@/Pages/User/SingleProduct'
import Purchase from '@/Pages/User/Purchase'
import Dashboard from '@/Pages/Admin/Dashboard'
import PurchaseSuccessPage from '@/Pages/User/Purchase'
import DashboardProduct from '@/Pages/Admin/DashboardProduct'

import DashboardAnalytic from '@/Pages/Admin/DashboardAnalytic'
import Profile from '@/Pages/User/Profile'

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
        <Route path='/profile' element={
          <ProtectRoute>
            <Profile />
          </ProtectRoute>
        } />
        
       <Route path="/purchase" element={<ProtectRoute><PurchaseSuccessPage /></ProtectRoute>} />
        <Route path='/dashboard' element={<ProtectRoute><Dashboard/></ProtectRoute>}>
        {/* Child routes - yahan path relative hai */}
        <Route index element={<DashboardAnalytic />} /> {/* /dashboard pe default */}
        <Route path='product' element={<DashboardProduct />} /> {/* /dashboard/product */}
       
      </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default MainRoutes