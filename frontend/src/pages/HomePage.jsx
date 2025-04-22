


import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link, Navigate } from 'react-router-dom';

const HomePage = () => {

  

  const user = useAuthStore(s => s.user);
  return (
    <div>
      {user && <p>{user.username}</p>}
    </div>
  )
}

export default HomePage
