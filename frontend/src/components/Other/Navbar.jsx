import React, { useEffect } from 'react'
import { Button } from '../ui/button'
// import { Button } from '../ui/button'

// import { useUserStore } from '@/Store/Store';
import { useLogoutMutation } from '@/hooks/User/user.hook';
import { Spinner } from '../ui/spinner';
import { useUserStore } from '@/Store/Store';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Navbar = () => {

  const {user} = useUserStore()
  // console.log(user?.name)
const {mutate, isPending}=  useLogoutMutation()
  const logoutHandler =()=>{
    mutate()
  }
  return (
    <div className='flex items-center justify-between p-5 '>
        <h1>E-commerce</h1>

        <div className='flex items-center justify-center gap-6'>
            <h1 className='cursor-pointer'>Home</h1>
            <h1 className='cursor-pointer'>Products</h1>
            <h1 className='cursor-pointer'>Cart</h1>
        </div>

        <div className='flex items-center justify-center gap-5'>
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