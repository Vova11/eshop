import {Link} from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Fragment } from 'react'
import { logoutUserAsync } from '../store/Auth/Auth.service'

type NavBarProps = {
  user: string | undefined
  isAuthenticated: boolean
}

const Header = ({isAuthenticated, user }: NavBarProps) => {
  
  const dispatch = useAppDispatch();
  
  

 const handleLogout = () => {
   console.log('logging out')
   dispatch(logoutUserAsync())
 }
  
 
  return (
    <header className='bg-neutral py-2 text-neutral-content'>
      <div className='align-element flex justify-center sm:justify-end'>
        {/* USER */}
        {/* LINKS */}
        {user ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm'>Hello, {user}</p>
            <button
              className='btn btn-xs btn-outline btn-primary'
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center'>
            <Link to='/login' className='link link-hover text-xs sm:text-sm'>
              Sign in / Guest
            </Link>
            <Link to='/register' className='link link-hover text-xs sm:text-sm'>
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
export default Header