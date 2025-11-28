import React from 'react'

import MainRoutes from './Routes/MainRoutes'
import Navbar from './components/Other/Navbar'
import { useLocation } from 'react-router-dom'

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
    </div>
  )
}

export default App