


import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'

const ErrorComponents = ({ error , redirect, act= true}) => {

  const nav = useNavigate();
  useEffect(() => {
    if (error.status === 404 && redirect) {
      toast.error(error.response?.data?.detail?.error || 'Not Found');
      nav(redirect);
    }
    
    if(error.status === 401 || 
      error.status === 403 || 
      error.status === 500 ||
      error.status === 409){
        toast.error(error.response?.data?.detail?.error || 'An error occurred');
      }

    if (error.code === "ERR_NETWORK"){
      toast.error(error.message);
    }

  }, [error, redirect, nav]);

  if (error.code === "ERR_NETWORK"){
    return null
  }
  
  if (error.status === 422) {
    if(act=== false){
      return null
    }
    return (
      <div >
        {
          error.response.data.detail.map((err, index) => (
            <p key={index} className='text-red-500 text-sm'> <span>{err.loc[1]}:</span> {err.msg}</p>
          ))
        }
      </div>
    )
  } else if (
    error.status === 401 || 
    error.status === 403 || 
    error.status === 500 ||
    error.status === 409
  ) {
    return null
  } else if(error.status === 404){
    return null
  }

  return (
    <div className='text-red-500 text-sm'>
      Unexpected error occurred. Please try again later.
    </div>
  )
}

export default ErrorComponents
