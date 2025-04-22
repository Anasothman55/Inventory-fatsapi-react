


import React, { useEffect, useState } from 'react'
import { useCategoryData } from '../../hook/categoryHook'
import {  useSearchParams } from 'react-router-dom';
import { ErrorComponents, SelectBox, TableComponents } from '../../components/content';
import {   
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow, } from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const orderByOptions = [
  { value: 'created_at', label: 'Created At' },
  { value: 'name', label: 'Name' },
  { value: 'updated_at', label: 'Updated At' },
];


const  orderOptions= [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
]

const MainCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderByParam = searchParams.get("order_by") || "created_at";
  const orderParam = searchParams.get("order") || "asc";

  const [orderBySelected, setOrderBySelected] = useState(orderByParam);
  const [orderSelected, setOrderSelected] = useState(orderParam);


  const {data, isLoading, error, isError } = useCategoryData(orderByParam,orderParam)
  
  useEffect(() => {
    const isValidOrderBy = orderByOptions.some(opt => opt.value === orderByParam);
    const isValidOrder = orderOptions.some(opt => opt.value === orderParam);
  
    if (!isValidOrderBy || !isValidOrder) {
      setSearchParams({ order_by: "created_at", order: "asc" });
    }
  }, []);

  const handleOrderByChange = (value) => {
    setOrderBySelected(value);
    setSearchParams({ order_by: value, order: orderSelected });
  };
  
  const handleOrderChange = (value) => {
    setOrderSelected(value);
    setSearchParams({ order_by: orderBySelected, order: value });
  };

  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>{
      <ErrorComponents error={error} />
    }</div>
  }
    



  return (  
    <div>
      <h3 className='text-[14px]'>Category / All Category</h3>
      
      <h1 className='font-bold text-[32px] mt-5'>All Categories</h1>
      <div className='flex gap-4 mt-4'>
        <div>
          {/* add */}
        </div>

        <div>
          {/* search */ }
        </div>

        <div>
          {/* order */}
          <SelectBox order={orderBySelected} options={orderByOptions} onValueChange={handleOrderByChange} />
          <SelectBox order={orderSelected} options={orderOptions} onValueChange={handleOrderChange} />

        </div>
      </div>

      {/* Render fetched category data here */}
      <div className='mt-6 overflow-auto max-h-96 rounded-[5px] shadow-lg' >

        <Table className="min-w-full table-auto bg-white">
          <TableHeader>
            <TableRow className="text-left bg-gray-100 text-sm font-semibold text-gray-700">
              <TableHead className="px-4 py-2">#</TableHead>
              <TableHead className="px-4 py-2">Name</TableHead>
              <TableHead className="px-4 py-2">User</TableHead>
              <TableHead className="px-4 py-2">Created At</TableHead>
              <TableHead className="px-4 py-2">Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((c, index) => {
                const formatDate = (dateStr) => {
                  const date = new Date(dateStr);
                  const day = date.getDate();
                  const month = date.getMonth() + 1;
                  const year = date.getFullYear();
                  return `${day}-${month}-${year}`;
                };
        
                return (
                  <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
                    <TableCell className="px-4 py-2 text-gray-700">{c.name}</TableCell>
                    <TableCell className="px-4 py-2 text-gray-700">anas</TableCell>
                    <TableCell className="px-4 py-2 text-gray-600">{formatDate(c.created_at)}</TableCell>
                    <TableCell className="px-4 py-2 text-gray-600">{formatDate(c.updated_at)}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>

        <TableComponents data={data}/>
      </div>
    </div>
  )
}

export default MainCategory
