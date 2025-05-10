




import { useLogout } from '@/hook/authHooks'
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

const LogoutButton = () => {


  const mutateLogout = useLogout()
  
  const handleLogout = async (e) => {
    e.preventDefault()
    mutateLogout.mutate()
  }
  
  return (
    <div className='mt-5 mb-5'>
      <form onSubmit={handleLogout}>
        <Button type="submit" className="cursor-pointer" variant="destructive"> Logout</Button>
      </form>
    </div>
  )
}

export default LogoutButton



