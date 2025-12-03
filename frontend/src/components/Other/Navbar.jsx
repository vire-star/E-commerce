import React from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useLogoutMutation } from '@/hooks/User/user.hook';
import { Spinner } from '../ui/spinner';
import { useUserStore } from '@/Store/Store';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User, LayoutDashboard, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { mutate, isPending } = useLogoutMutation();

  const logoutHandler = () => {
    mutate();
  };

  return (
    <nav className='border-b border-gray-200 bg-white'>
      <div className='flex items-center justify-between h-16 px-6 max-w-7xl mx-auto'>
        {/* Logo */}
        <Link to='/' className='text-xl font-semibold text-gray-900 hover:text-gray-700 transition'>
          E-Mart
        </Link>

        {/* Navigation Links */}
        <div className='flex items-center gap-8'>
          <Link 
            to='/' 
            className='text-sm font-medium text-gray-700 hover:text-gray-900 transition'
          >
            Home
          </Link>
          <Link 
            to='/product' 
            className='text-sm font-medium text-gray-700 hover:text-gray-900 transition'
          >
            Products
          </Link>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-4'>
          {/* Cart Icon */}
          <Link to='/cart'>
            <button className='relative p-2 hover:bg-gray-100 rounded-full transition'>
              <ShoppingCart className='h-5 w-5 text-gray-700' />
              {user?.cartItems && user.cartItems.length > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center'>
                  {user.cartItems.length}
                </span>
              )}
            </button>
          </Link>

          {/* User Menu Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className='flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className='text-sm'>{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className='text-sm font-medium text-gray-700 hidden sm:block'>
                  {user?.name}
                </span>
                <ChevronDown className='h-4 w-4 text-gray-500' />
              </button>
            </PopoverTrigger>

            <PopoverContent className='w-56 p-2' align='end'>
              <div className='flex flex-col gap-1'>
                {/* Profile */}
                <Link 
                  to='/profile'
                  className='flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition'
                >
                  <User className='h-4 w-4' />
                  <span>Profile</span>
                </Link>

                {/* Dashboard (Admin Only) */}
                {user?.email === "v@gmail.com" && (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className='flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition text-left w-full'
                  >
                    <LayoutDashboard className='h-4 w-4' />
                    <span>Dashboard</span>
                  </button>
                )}

                {/* Divider */}
                <div className='h-px bg-gray-200 my-1' />

                {/* Logout */}
                <button
                  onClick={logoutHandler}
                  disabled={isPending}
                  className='flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition text-left w-full disabled:opacity-50'
                >
                  {isPending ? (
                    <>
                      <Spinner className='h-4 w-4' />
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className='h-4 w-4' />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
