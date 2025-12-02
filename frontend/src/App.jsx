import React from 'react'

import MainRoutes from './Routes/MainRoutes'
import Navbar from './components/Other/Navbar'
import { useLocation } from 'react-router-dom'
import Footer from './Pages/User/Footer'

const App = () => {
    const location = useLocation()

  const hiddenRoutes  =['/register','/login', '/dashboard']

    const shouldHideNavbar = hiddenRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  return (
    <div>
       {!shouldHideNavbar && <Navbar />}
     <MainRoutes/>
     <Footer/>
    </div>
  )
}

export default App