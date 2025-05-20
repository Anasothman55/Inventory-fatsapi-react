

import CreateEmployeeInfo from '@/components/content/dailog/employee/CreateEmployeeInfo'
import UpdateEmployeeInfoButton from '@/components/content/dailog/employee/UpdateEmployeeInfoButton'
import React from 'react'
import {  useParams } from 'react-router-dom'
import {ErrorComponents} from "@/components/content/index.jsx";
import {usePurchaseItemOneData, usePurchaseOneData} from "@/hook/purchaseHook.jsx";
import CreatePurchaseDetailCard from "@/components/content/dailog/purchases/CreatePurchaseDetailCard.jsx";
import UpdatePurhcaseDetailCard from '@/components/content/dailog/purchases/UpdatePurhcaseDetailCard'


const PurchaseItemDetailPage = () => {

  const { id, pi_id } = useParams()

  const { data, isLoading, error, isError } = usePurchaseItemOneData(pi_id)
  console.log(data)
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
      <UpdatePurhcaseDetailCard name={`${data?.purchas_model?.receipt_number} : ${data?.purchas_model?.purchasing_plase}`} uid={data.uid} data={data}/>
    </div>
  )
}

export default PurchaseItemDetailPage



