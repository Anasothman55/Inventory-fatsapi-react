


import { ErrorComponents } from '@/components/content';
import DashboardTransaction from '@/components/content/DashboardTransaction';
import MinStockLevle from '@/components/content/MinStockLevle';
import PurchaseChart from '@/components/content/PurchaseChart';
import TotalCard from '@/components/content/TotalCard';
import { useDashboardData } from '@/hook/dashboard.hook';
import React from 'react'
import { Link, Navigate } from 'react-router-dom';

const HomePage = () => {

  const {data, isError, isLoading, error} = useDashboardData()

  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>{
      <ErrorComponents error={error} />
    }</div>
  }

  return (
    <div className='h-full flex flex-col' >
      <h3 className='text-[14px]'>dashboard</h3>
      <h1 className='font-bold text-[32px] mt-5'>Dashboard</h1>
      
      <div className='flex flex-col mt-10 w-full h-full'>
        <div className='flex flex-wrap w-full gap-5 mb-5 '>
          <TotalCard data={data?.transaction?.total} title={"Today transaction"}/>
          <TotalCard data={`$ ${data?.purchase?.data[0]?.USD || 0}`} title={"Today purchase dollar"}/>
          <TotalCard data={`${data?.purchase?.data[0]?.dinar || 0} د.ع`} title={"Today purchase dinnar"}/>
        </div>

        <div className="flex-1 grid grid-rows-[1fr_1fr] gap-5 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-[5px] min-h-[300px] ">
              <PurchaseChart datas={data?.purchase?.data}/>
            </div>
            <div className="lg:col-span-1 rounded-[5px] min-h-[300px]">
              <MinStockLevle datas={data?.items?.data}/>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="min-h-[300px] rounded-[5px]">
              <DashboardTransaction datas={data?.transaction?.items}/>
            </div>
            <div className="min-h-[300px] rounded-[5px] bg-yellow-200 "></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
