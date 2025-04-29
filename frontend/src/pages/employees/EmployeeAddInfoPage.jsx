

import CreateEmployeeInfo from '@/components/content/dailog/employee/CreateEmployeeInfo'
import UpdateEmployeeInfoButton from '@/components/content/dailog/employee/UpdateEmployeeInfoButton'
import { useEmployeeOneData } from '@/hook/employee'
import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const EmployeeAddInfoPage = () => {
  const [searchPrams] = useSearchParams()

  const update = searchPrams.get("update") === "true" ? true : false

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

  if (!update && data?.employee_info_model) {
    nav(`/employees/${id}`)
  }

  return (
    <div className='flex justify-center w-full pt-10 '>
      {
        update ? <UpdateEmployeeInfoButton data={data}/>
        : <CreateEmployeeInfo name={data.name} uid={data.uid}/>
      }
    </div>
  )
}

export default EmployeeAddInfoPage
