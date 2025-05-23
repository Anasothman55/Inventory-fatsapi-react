import CreateEmployeeInfo from '@/components/content/dailog/employee/CreateEmployeeInfo'
import UpdateEmployeeInfoButton from '@/components/content/dailog/employee/UpdateEmployeeInfoButton'
import { useEmployeeOneData } from '@/hook/employee'
import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {ErrorComponents} from "@/components/content/index.jsx";
import {usePurchaseOneData} from "@/hook/purchaseHook.jsx";
import CreatePurchaseDetailCard from "@/components/content/dailog/purchases/CreatePurchaseDetailCard.jsx";
import UpdatePurhcaseDetailCard from '@/components/content/dailog/purchases/UpdatePurhcaseDetailCard'


const PurchaseAddDetailPage = () => {

  const { id } = useParams()

  const { data, isLoading, error, isError } = usePurchaseOneData(id)
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
      <CreatePurchaseDetailCard name={`${data.receipt_number} : ${data.purchasing_plase}`} uid={data.uid}/>
    </div>
  )
}
export default PurchaseAddDetailPage
