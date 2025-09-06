import { CreateItemButton, ErrorComponents, UpdateItemButton } from '@/components/content'
import { useItemsOneData } from '@/hook/itemsHook'
import React from 'react'
import {  useSearchParams } from 'react-router-dom'

const ItemCreatePage = () => {
  const [searchPrams] = useSearchParams()


  
  const id = searchPrams.get("id") 


  const { data, isLoading, error, isError } = useItemsOneData(id, {enabled: !!id} )

  if(!id) {
    return (
      <div className='flex justify-center w-full pt-10 '>
       <CreateItemButton />
      </div>
    )
  }
  

  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>
      <ErrorComponents error={error} redirect={"/category"}/>
    </div>
  }

  
  

  return (
    <div className='flex justify-center w-full pt-10 '>
      <UpdateItemButton data={data}/>
    </div>
  )
}

export default ItemCreatePage
