
import {   ErrorComponents, TableComponents } from '../../components/content';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { usePurchaseData } from '@/hook/purchaseHook';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InlineIcon } from '@iconify/react/dist/iconify.js';



const header = [
  { name: "index", placeholder: "#" },
  { name: "purchasing_plase", placeholder: "Plase" },
  { name: "receipt_number", placeholder: "Receipt Number" },
  { name: "purchaser", placeholder: "Purchaser" },
  { name: "curuncy_type", placeholder: "Curuncy Type" },
  { name: "total_price", placeholder: "Total Price" },
  { name: "recipient", placeholder: "Recipient" },
  { name: "purchase_date", placeholder: "Purchase Date" },
]


const MainPurchasePage = () => {
  const [searchBox, setSearchBox] = useState('')
  const nav = useNavigate()

  const {data, isLoading, error, isError } = usePurchaseData()
  
  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>{
      <ErrorComponents error={error} />
    }</div>
  }

  const filteredData = data.filter((item) =>
    item.purchasing_plase.toLowerCase().includes(searchBox.toLowerCase()) || 
    item.purchaser.toLowerCase().includes(searchBox.toLowerCase())        ||
    String(item.receipt_number).includes(searchBox.toLowerCase())   ||
    item.recipient.toLowerCase().includes(searchBox.toLowerCase())
  );

  function handleAdd() {
    nav(`/purchase/new`)
  }

  return (  
    <div  className='h-full flex flex-col '>
      <h3 className='text-[14px]'>Purchase / All Purchase</h3>
      
      <h1 className='font-bold text-[32px] mt-5'>All Purchase</h1>
      
      <div className='flex justify-between max-md:flex-col mt-10  gap-5'>
        <Button  className="cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-emerald-700 hover:border-emerald-700"  variant="outline" onClick={handleAdd}> <span> <InlineIcon icon={"gala:add"}/></span> Add Items</Button>
        <Input value={searchBox} onChange={(e)=> setSearchBox(e.target.value)} className="w-80 py-5 border border-gray-300 focus:ring-1 focus:ring-gray-300 ring-offset-2 transition-all duration-300 ease-in max-md:w-full "  type="text" placeholder="Search"/>
      </div>

      {/* Render fetched category data here */}
      <div className="mt-6 flex-grow min-h-[90vh] pb-4">
      <ScrollArea className="h-full w-full rounded-sm shadow-sm overflow-auto">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <TableComponents data={filteredData} header={header} types={"purchases"}/>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>


      </div>
    </div>
  )
}

export default MainPurchasePage

