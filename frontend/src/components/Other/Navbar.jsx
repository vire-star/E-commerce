import React, { useEffect } from 'react'
import { Button } from '../ui/button'
// import { Button } from '../ui/button'

// import { useUserStore } from '@/Store/Store';
import { useLogoutMutation } from '@/hooks/User/user.hook';
import { Spinner } from '../ui/spinner';
import { useUserStore } from '@/Store/Store';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {

  const {user} = useUserStore()
  // console.log(user?.name)
const {mutate, isPending}=  useLogoutMutation()
  const logoutHandler =()=>{
    mutate()
  }
  return (
    <div className='flex items-center justify-between h-[13vh] px-5 '>
        <h1>E-commerce</h1>

        <div className='flex items-center justify-center gap-6'>
           <Link className='cursor-pointer' to={'/'}>Home</Link>
           <Link className='cursor-pointer' to={'/product'}>Product</Link>
           
        </div>

        <div className='flex items-center justify-center gap-5'>
          <Link className='cursor-pointer' to={'/cart'}>
           <ShoppingCart/>
           </Link>
          <div className='flex items-center justify-center gap-3'>
            <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
<span>{user?.name}</span>
          </div>
            <Button onClick={logoutHandler}>
                {isPending?<Spinner/>:"Logout"}
            </Button>
        </div>
    </div>
  )
}

export default Navbar