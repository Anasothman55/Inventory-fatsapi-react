

import CreateEmployeeInfo from '@/components/content/dailog/employee/CreateEmployeeInfo'
import { useEmployeeOneData } from '@/hook/employee'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeAddInfoPage = () => {
  const { id } = useParams()
  const nav = useNavigate()

  const { data, isLoading, error, isError } = useEmployeeOneData(id)
  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>
      <ErrorComponents error={error} redirect={"/category"}/>
    </div>
  }

  if (data?.employee_info_model) {
    nav(`/employees/${id}`)
  }

  return (
    <div className='flex justify-center w-full pt-10 '>
      <CreateEmployeeInfo name={data.name} uid={data.uid}/>
    </div>
  )
}

export default EmployeeAddInfoPage
