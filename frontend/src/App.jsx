import React from 'react'

import MainRoutes from './Routes/MainRoutes'
import Navbar from './components/Other/Navbar'
import { useLocation } from 'react-router-dom'

const App = () => {
    const location = useLocation()

  const hiddenRoutes  =['/register','/login']
  return (
    <div>
      {!hiddenRoutes.includes(location.pathname)&& <Navbar/>}
     <MainRoutes/>
    </div>
  )
}

export default App