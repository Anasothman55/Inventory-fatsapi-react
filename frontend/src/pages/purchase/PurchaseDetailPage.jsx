import { CreateCategoryDailog, DeleteCategoy, ErrorComponents, TableComponents, UpdateCategory } from '@/components/content'
import DeletePurchaseButton from '@/components/content/dailog/purchases/DeletePurchaseButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useCategoryOneData } from '@/hook/categoryHook'
import { usePurchaseOneData } from '@/hook/purchaseHook'
import { InlineIcon } from '@iconify/react'
import React, { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import UpdatePurchaseButton from "@/components/content/dailog/purchases/UpdatePurchaseButton.jsx";

const header = [
  { name: "index", placeholder: "#" },
  { name: "items_model.item_name", placeholder: "Name" },
  { name: "quantity", placeholder: "Quantity" },
  { name: "items_model.stock", placeholder: "Stock" },
  { name: "unite_price", placeholder: "Unit Price" },
  { name: "subtotal_price", placeholder: "Subtotal Price" },
]

const PurchaseDetailPage = () => {
  const [searchBox, setSearchBox] = useState('')
  const { id } = useParams()
  const nav = useNavigate()

  const { data, isLoading, error, isError } = usePurchaseOneData(id)
  
  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>
      <ErrorComponents error={error} redirect={"/purchase"}/>
    </div>
  }

  const filteredData = data.purchas_items_model.filter((item) =>
    item.items_model.item_name.toLowerCase().includes(searchBox.toLowerCase())
  );

  const handleAddDetail = ()=>{
    nav(`/purchase/${id}/purchase-info`)
  }


  function handleUpdate() {
    nav(`/purchase/update?id=${data?.uid}`)
  }

  return (
    <div className='h-full flex flex-col '>
      <h3 className="text-[14px]">Purchase / {`${data.purchasing_plase} : ${data.receipt_number}`}</h3>
      <h1 className="font-bold text-[32px] mt-5 mb-5">{`${data.purchasing_plase} : ${data.receipt_number}`}</h1>
      {
        data.note && (
          <p>Note: {data.note}</p>
        )
      }
      {/* Meta Info */}
      <div className="mt-6 flex flex-wrap justify-between max-md:flex-col max-md:items-start gap-4 items-center text-sm text-gray-700">
        <div className='flex gap-5 max-md:flex-col max-md:w-full flex-wrap'>
          <p className=''>
            <span className="mr-1 font-medium">Purchaser:</span>
            <span className="bg-white px-3 py-1 rounded-md border w-full">{data.purchaser}</span>
          </p>
          <p className=''>
            <span className="mr-1 font-medium">Beneficiary:</span>
            <span className="bg-white px-3 py-1 rounded-md border w-full">{data.beneficiary}</span>
          </p>
          <p className=''>
            <span className="mr-1 font-medium">Curuncy Type:</span>
            <span className="bg-white px-3 py-1 rounded-md border w-full">{data.curuncy_type}</span>
          </p>
          <p className=''>
            <span className="mr-1 font-medium">Totalprice:</span>
            <span className="bg-white px-3 py-1 rounded-md border w-full">{data.total_price}</span>
          </p>
          <p className=''>
            <span className="mr-1 font-medium">Recipient:</span>
            <span className="bg-white px-3 py-1 rounded-md border w-full">{data.recipient}</span>
          </p>
          <p className=''>
            <span className="mr-1 font-medium">Purchase Date:</span>
            <span className="bg-white px-3 py-1 rounded-md border w-full">{data.purchase_date}</span>
          </p>
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
          <Button onClick={handleUpdate} className="hover:bg-white  cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-yellow-500 hover:border-yellow-500 "   variant="outline"> <span> <InlineIcon icon={"radix-icons:update"}/> </span> Update Purchase</Button>
          <Button onClick={handleAddDetail} className="cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-emerald-700 hover:border-emerald-700 hover:bg-white"  variant="outline"> <span> <InlineIcon icon={"gala:add"}/></span> Add Details</Button>
          <DeletePurchaseButton uid={id} name={data.purchasing_plase} />
        </div>
      </div>
  
      {/* Main content grows to take remaining space */}
      {
        data.purchas_items_model.length > 0 && (
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
                    <TableComponents data={filteredData} header={header} types={"purchaseItems"}  />
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

export default PurchaseDetailPage
