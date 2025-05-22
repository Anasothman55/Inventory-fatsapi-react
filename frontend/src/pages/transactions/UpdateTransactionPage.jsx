

import { ErrorComponents } from '@/components/content'
import UpdateTransactionCrad from '@/components/content/dailog/transactions/UpdateTransactionCrad'
import { useTransactionOneData } from '@/hook/transaction'
import React from 'react'
import { useParams } from 'react-router-dom'

const UpdateTransactionPage = () => {

  const { id } = useParams()

  const { data, isLoading, error, isError } = useTransactionOneData(id)
  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>
      <ErrorComponents error={error} redirect={"/items"}/>
    </div>
  }

  return (
    <div className='flex justify-center w-full pt-10 '>
      <UpdateTransactionCrad data={data}/>
    </div>
  )
}

export default UpdateTransactionPage
