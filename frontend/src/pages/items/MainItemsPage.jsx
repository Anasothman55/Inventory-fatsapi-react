import {  CreateItemButton, ErrorComponents, TableComponents } from '../../components/content';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useItemsData } from '@/hook/itemsHook';



const header = [
  { name: "index", placeholder: "#" },
  { name: "item_name", placeholder: "Name" },
  { name: "stock", placeholder: "Stock" },
  { name: "unit", placeholder: "Unit" },
  { name: "minimum_stock_level", placeholder: "Min Stock Level" },
  { name: "description", placeholder: "Descriptions" },
  { name: "created_at", placeholder: "Created At" },
  { name: "updated_at", placeholder: "Updated At" },
]


const MainItemsPage = () => {
  const [searchBox, setSearchBox] = useState('')

  const {data, isLoading, error, isError } = useItemsData()
  
  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>{
      <ErrorComponents error={error} />
    }</div>
  }

  const filteredData = data.filter((item) =>
    item.item_name.toLowerCase().includes(searchBox.toLowerCase())
  );


  return (  
    <div  className='h-full flex flex-col '>
      <h3 className='text-[14px]'>Category / All Items</h3>
      
      <h1 className='font-bold text-[32px] mt-5'>All Items</h1>
      
      <div className='flex justify-between max-md:flex-col mt-10  gap-5'>
        <CreateItemButton/>
        <Input value={searchBox} onChange={(e)=> setSearchBox(e.target.value)}    className="w-80 py-5 border border-gray-300 focus:ring-1 focus:ring-gray-300 ring-offset-2 transition-all duration-300 ease-in max-md:w-full "  type="text" placeholder="Search"/>
      </div>

      {/* Render fetched category data here */}
      <div className="mt-6 flex-grow min-h-[90vh] pb-4">
      <ScrollArea className="h-full w-full rounded-sm shadow-sm overflow-auto">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <TableComponents data={filteredData} header={header} types={"items"}/>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>


      </div>
    </div>
  )
}

export default MainItemsPage




