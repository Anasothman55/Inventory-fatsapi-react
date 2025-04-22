import {   DeleteItemButton, ErrorComponents, TableComponents, UpdateItemButton } from '@/components/content'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {  useItemsOneData } from '@/hook/itemsHook'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'


// purchas_items_model
const header1 = [
  { name: "index", placeholder: "#" },
  { name: "quantity", placeholder: "Quantity" },
  { name: "unite_price", placeholder: "Unit Price" },
  { name: "subtotal_price", placeholder: "Total Price" },
]

// item_transaction_model
const header2 = [
  { name: "index", placeholder: "#" },
  { name: "employee_model.name", placeholder: "Employee" },
  { name: "quantity", placeholder: "Queantity" },
  { name: "action_type", placeholder: "Actions Type" },
  { name: "transaction_date", placeholder: "Date" },
  { name: "transaction_time", placeholder: "Time" },
]




const ItemsDetailPage = () => {
  const [searchBoxTransactions, setSearchBoxTransactions] = useState('')
  const { id } = useParams()

  const { data, isLoading, error, isError } = useItemsOneData(id)
  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>
      <ErrorComponents error={error} redirect={"/items"}/>
    </div>
  }

  const filteredDataTransactions = data.item_transaction_model.filter((item) =>
    item.employee_model.name.toLowerCase().includes(searchBoxTransactions.toLowerCase())
  );
  
  return (
    <div className='h-full flex flex-col '>
      <h3 className="text-[14px]">Item / {data.item_name}</h3>
      <h1 className="font-bold text-[32px] mt-5 mb-5">{data.item_name}</h1>
      {
        data.description && (
          <p className=" text-[20px] mt-5 mb-5">Description: {data.description}</p>
        )
      }
      {/* Meta Info */}
      <div className="mt-6 flex flex-wrap justify-between max-md:flex-col max-md:items-start gap-4 items-center text-sm text-gray-700">
        <div className='flex gap-5 max-md:flex-col max-md:w-full flex-wrap'>
          <p className=''>
            <span className="mr-1 font-medium">Category:</span>
            <span className="bg-white px-3 py-1 rounded-md border w-full">{data.category_model.name}</span>
          </p>
          <p className=''>
            <span className="mr-1 font-medium">Created At:</span>
            <span className="bg-white px-3 py-1 rounded-md border w-full">{new Date(data.created_at).toLocaleString()}</span>
          </p>
          <p>
            <span className="mr-1 font-medium">Updated At:</span>
            <span className="bg-white px-3 py-1 rounded-md border">{new Date(data.updated_at).toLocaleString()}</span>
          </p>
          <p>
            <span className="mr-1 font-medium">Stock:</span>
            <span className="bg-white px-3 py-1 rounded-md border">{data.stock}</span>
          </p>
          <p>
            <span className="mr-1 font-medium">Unit:</span>
            <span className="bg-white px-3 py-1 rounded-md border">{data.unit}</span>
          </p>
          <p>
            <span className="mr-1 font-medium">Minimum Stock Level:</span>
            <span className="bg-white px-3 py-1 rounded-md border">{data.minimum_stock_level}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex max-md:w-full  max-md:flex-col gap-5 max-md:mt-5">
          <UpdateItemButton data={data}/>
          <DeleteItemButton uid={data.uid} name={data.item_name} />
        </div>
      </div>
  
      {/* Main content grows to take remaining space */}
      <div className="mt-10 max-md:mt-5 flex flex-col  gap-5 flex-grow min-h-40">
        {/* Search */}
        {
          data.item_transaction_model.length > 0 && (
            <>
              <div className='flex justify-between max-md:flex-col items-center gap-5'>
                <h1 className='text-[24px]'>Items Transactions</h1>
                <Input value={searchBoxTransactions} onChange={(e) => setSearchBoxTransactions(e.target.value)}  className="w-80 py-5 border border-gray-300 focus:ring-1 focus:ring-gray-300 ring-offset-2 transition-all duration-300 ease-in max-md:w-full "
                  type="text"
                  placeholder="Search"
                />
              </div>

              {/* Scrollable table area */}
              <div className="flex-grow min-h-[90vh] pb-4">

                <ScrollArea className="h-full w-full rounded-sm shadow-sm overflow-auto">
                  <div className="w-full overflow-x-auto">
                    <div className="min-w-[800px]">
                      <TableComponents data={filteredDataTransactions} header={header2} types={"itemsTransactions"}  />
                    </div>
                  </div>
                  <ScrollBar orientation="horizontal" />
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </>
          )
        }
        { 
          data.purchas_items_model.length > 0 && (
            <div className="flex-grow min-h-[90vh] pb-4">
              <h1 className='text-[24px] mb-5'>Items Purchase</h1>
              <ScrollArea className="h-full w-full rounded-sm shadow-sm overflow-auto">
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[800px]">
                    <TableComponents data={data.purchas_items_model} header={header1} types={"itemsPurchase"}  />
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div> 
          )
        }
        
      </div>
    </div>
  )
  
}

export default ItemsDetailPage





