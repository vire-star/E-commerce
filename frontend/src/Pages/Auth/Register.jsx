import { Spinner } from '@/components/ui/spinner'
import { useRegisterMutation } from '@/hooks/User/user.hook'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ShoppingBag, Mail, Lock, User } from 'lucide-react'

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { mutate, isPending } = useRegisterMutation()
  
  const registerFormHandler = (data) => {
    mutate(data)
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Brand Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4'>
            <ShoppingBag className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900'>Create Account</h1>
          <p className='text-gray-600 mt-2'>Join us and start shopping today</p>
        </div>

        {/* Form Card */}
        <div className='bg-white rounded-lg shadow-lg p-8 border border-gray-200'>
          <form onSubmit={handleSubmit(registerFormHandler)} className='space-y-5'>
            
            {/* Name Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Full Name
              </label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder='Enter your full name'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder='your.email@example.com'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  placeholder='Create a strong password'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isPending}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isPending ? <Spinner className="w-5 h-5" /> : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <div className='text-center'>
            <Link 
              to='/login' 
              className='text-blue-600 hover:text-blue-700 font-medium hover:underline'
            >
              Sign in instead
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className='text-center text-sm text-gray-600 mt-6'>
          By signing up, you agree to our{' '}
          <a href='#' className='text-blue-600 hover:underline'>Terms</a>
          {' '}and{' '}
          <a href='#' className='text-blue-600 hover:underline'>Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}

export default Register
