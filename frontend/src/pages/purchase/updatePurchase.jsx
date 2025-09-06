import UpdatePurchaseButton from '@/components/content/dailog/purchases/UpdatePurchaseButton';
import { usePurchaseData, usePurchaseOneData } from '@/hook/purchaseHook'
import React from 'react'
import { useSearchParams } from 'react-router-dom';

const UpdatePurchase = () => {  

  const [searchParams] = useSearchParams();

  // get specific query param
  const id = searchParams.get("id"); 
  const { data, isLoading, error, isError }  = usePurchaseOneData(id)
  
  console.log(data)
  return (
    <div className='flex justify-center w-full pt-10 '>
      <UpdatePurchaseButton data={data}/>
    </div>
  )
}

export default UpdatePurchase
