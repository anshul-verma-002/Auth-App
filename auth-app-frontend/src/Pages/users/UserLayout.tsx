import React from 'react'
import { Navigate, Outlet } from 'react-router'
import useAuth from '../../Auth/Store'

const UserLayout = () => {

  const checkLogin = useAuth(state=>state.checkLogin);

  if(checkLogin())
  return (
    <div className='flex justify-center w-full items-start'>
      <Outlet />
    </div>
  )
  else return <Navigate to={"/"} />;
}

export default UserLayout