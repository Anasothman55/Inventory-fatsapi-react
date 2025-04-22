import { CreateCategoryDailog, DeleteCategoy, ErrorComponents, TableComponents, UpdateCategory } from '@/components/content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useCategoryOneData } from '@/hook/categoryHook'
import { InlineIcon } from '@iconify/react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const header = [
  { name: "index", placeholder: "#" },
  { name: "item_name", placeholder: "Name" },
  { name: "unit", placeholder: "Unit" },
  { name: "stock", placeholder: "Stock" },
  { name: "minimum_stock_level", placeholder: "Min Stock Level" },
]

const CategoryDetails = () => {
  const [searchBox, setSearchBox] = useState('')
  const { id } = useParams()

  const { data, isLoading, error, isError } = useCategoryOneData(id)

  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>
      <ErrorComponents error={error} redirect={"/category"}/>
    </div>
  }

  const filteredData = data.items_model.filter((item) =>
    item.item_name.toLowerCase().includes(searchBox.toLowerCase())
  );

  return (
    <div className='h-full flex flex-col '>
      <h3 className="text-[14px]">Category / {data.name}</h3>
      <h1 className="font-bold text-[32px] mt-5 mb-5">{data.name}</h1>
  
      {/* Meta Info */}
      <div className="mt-6 flex flex-wrap justify-between max-md:flex-col max-md:items-start gap-4 items-center text-sm text-gray-700">
        <div className='flex gap-5 max-md:flex-col max-md:w-full '>
          <p className=''>
            <span className="mr-1 font-medium">Created At:</span>
            <span className="bg-white px-3 py-1 rounded-md border w-full">{new Date(data.created_at).toLocaleString()}</span>
          </p>
          <p>
            <span className="mr-1 font-medium">Updated At:</span>
            <span className="bg-white px-3 py-1 rounded-md border">{new Date(data.updated_at).toLocaleString()}</span>
          </p>
          <p>
            <span className="mr-1 font-medium">Created By:</span>
            <span className="bg-white px-3 py-1 rounded-md border">{data.user_model.username}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex max-md:w-full  max-md:flex-col gap-5 max-md:mt-5">
          <UpdateCategory name={data.name} uid={data.uid} />
          <DeleteCategoy uid={data.uid} name={data.name} />
        </div>
      </div>
  
      {/* Main content grows to take remaining space */}
      {
        data.items_model.length > 0 && (
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
                    <TableComponents data={filteredData} header={header} types={"categoryItems"}  />
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

export default CategoryDetails