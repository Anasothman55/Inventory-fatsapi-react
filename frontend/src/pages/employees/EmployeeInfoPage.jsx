
import { CreateCategoryDailog, DeleteCategoy, ErrorComponents, TableComponents, UpdateCategory } from '@/components/content'
import DeleteEmployeeButton from '@/components/content/dailog/employee/DeleteEmployeeButton'
import FiredEmployee from '@/components/content/dailog/employee/FiredEmployee'
import UpdateEmployeButton from '@/components/content/dailog/employee/UpdateEmployeButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useCategoryOneData } from '@/hook/categoryHook'
import { useEmployeeOneData } from '@/hook/employee'
import { InlineIcon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const header = [
  { name: "index", placeholder: "#" },
  { name: "items_model.item_name", placeholder: "Name" },
  { name: "items_model.unit", placeholder: "Unit" },
  { name: "items_model.stock", placeholder: "Current Stock" },
  { name: "quantity", placeholder: "Quantity" },
  { name: "action_type", placeholder: "Action Type" },
  { name: "transaction_date", placeholder: "Date" },
  { name: "transaction_time", placeholder: "Time" },
  { name: "note", placeholder: "Note" },
]


function phoneFormat(num){

  const part1 = num.slice(0, 4);    // first 4 letters
  const part2 = num.slice(4, 7);    // next 3 letters
  const part3 = num.slice(7, 11);   // last 4 letters
  
  const result = `${part1}-${part2}-${part3}`;
  return result;
}

const EmployeeInfoPage = () => {
  const nav = useNavigate()
  const [searchBox, setSearchBox] = useState('')
  const { id } = useParams()


  const { data, isLoading, error, isError } = useEmployeeOneData(id)

  useEffect(()=>{
    if( data?.employee_info_model === null){
      nav(`/employees/employees-info/${id}`)
    }
  },[data?.employee_info_model, nav,id])

  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>
      <ErrorComponents error={error} redirect={"/category"}/>
    </div>
  }

  function handleUpdateInfo() {
    nav(`/employees/employees-info/${id}?update=true`)
  }

  const filteredData = data.item_transaction_model_em?.filter((item) =>
    item?.items_model?.item_name.toLowerCase().includes(searchBox.toLowerCase())
  );

  return (
    <div className='h-full flex flex-col '>
      <h3 className="text-[14px]">Category / {data.name}</h3>
      <h1 className="font-bold text-[32px] mt-5 mb-5">{data.name}</h1>
      <p>Note: {data?.employee_info_model?.note}</p>
  
      {/* Meta Info */}
      <div className="mt-6 flex flex-wrap justify-between max-md:flex-col max-md:items-start gap-4 items-center text-sm text-gray-700">
        <div className='flex gap-5 max-md:flex-col max-md:w-full flex-wrap'>
          {
            data.employee_info_model?.email && <p className=''>
              <span className="mr-1 font-medium">Email:</span>
              <span className="bg-white px-3 py-1 rounded-md border w-full">{data.employee_info_model.email}</span>
            </p>
          }
          {
            data.employee_info_model?.phone_number && <p className=''>
              <span className="mr-1 font-medium">Phone Number:</span>
              <span className="bg-white px-3 py-1 rounded-md border w-full">{phoneFormat(data.employee_info_model.phone_number)}</span>
            </p>
          }
          {
            data.employee_info_model?.hire_date && <p className=''>
              <span className="mr-1 font-medium">Hire Date:</span>
              <span className="bg-white px-3 py-1 rounded-md border w-full">{data.employee_info_model.hire_date}</span>
            </p>
          }
          {
            data.employee_info_model?.address && <p className=''>
              <span className="mr-1 font-medium">Address:</span>
              <span className="bg-white px-3 py-1 rounded-md border w-full">{data.employee_info_model.address}</span>
            </p>
          }
          {
            data.employee_info_model?.job_title && <p className=''>
              <span className="mr-1 font-medium">Job Title:</span>
              <span className="bg-white px-3 py-1 rounded-md border w-full">{data.employee_info_model.job_title}</span>
            </p>
          }
          {
            data.employee_info_model?.date_of_birth && <p className=''>
              <span className="mr-1 font-medium">Date of Brith:</span>
              <span className="bg-white px-3 py-1 rounded-md border w-full">{data.employee_info_model.date_of_birth}</span>
            </p>
          }
          {
            data.employee_info_model?.slary && <p className=''>
              <span className="mr-1 font-medium">Salary:</span>
              <span className="bg-white px-3 py-1 rounded-md border w-full">{data.employee_info_model.salary}</span>
            </p>
          }
          {
            data.employee_info_model?.fired_date && <p className=''>
              <span className="mr-1 font-medium">Fired Date:</span>
              <span className="bg-white px-3 py-1 rounded-md border w-full">{data.employee_info_model.fired_date}</span>
            </p>
          }
          <p className=''>
            <span className="mr-1 font-medium">Created At:</span>
            <span className="bg-white px-3 py-1 rounded-md border w-full">{new Date(data.created_at).toLocaleString()}</span>
          </p>
          <p>
            <span className="mr-1 font-medium">Updated At:</span>
            <span className="bg-white px-3 py-1 rounded-md border">{new Date(data.updated_at).toLocaleString()}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex max-md:w-full  max-md:flex-col gap-5 max-md:mt-5">
          <UpdateEmployeButton names={data.name} uid={data.uid} />
          <Button className="hover:bg-white  cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-yellow-500 hover:border-yellow-500 "   variant="outline" onClick={handleUpdateInfo}> <span> <InlineIcon icon={"radix-icons:update"}/></span> Update Info</Button>
          <DeleteEmployeeButton uid={data.uid} name={data.name} />
          <FiredEmployee data={data}/>
        </div>
      </div>
  
      {/* Main content grows to take remaining space */}
      {
        data.item_transaction_model_em.length > 0 && (
          <div className="mt-10 max-md:mt-5 flex flex-col gap-5 flex-grow min-h-40">
            {/* Search */}
            <div className='flex justify-end max-md:flex-col gap-5'>
    
              <Input value={searchBox} onChange={(e) => setSearchBox(e.target.value)}  className="w-80 py-5 border border-gray-300 focus:ring-1 focus:ring-gray-300 ring-offset-2 transition-all duration-300 ease-in max-md:w-full "
                type="text"
                placeholder="Search"
              />
            </div>
      
            {/* Scrollable table area */}
            <div className="flex-grow min-h-[90vh] pb-4">
    
              <ScrollArea className="h-full w-full rounded-sm shadow-sm overflow-auto">
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[800px]">
                    <TableComponents data={filteredData} header={header} types={"employeeTransactions"}  /> 
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
        )
      }

    </div>
  )
  
}

export default EmployeeInfoPage
