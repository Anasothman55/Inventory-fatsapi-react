import { InlineIcon } from '@iconify/react'
import React from 'react'

const TotalCard = ({ data, title }) => {
  return (
    <div className='bg-[#F8F8F8] rounded-[5px] p-[10px] gap-[15px] min-w-[200px] flex-1'>
      <div className='flex items-center justify-start gap-[10px]'>
        <InlineIcon className='' icon={'carbon:ibm-data-product-exchange'}/>
        <p className='text-[12px]'>{title}</p>
      </div>
      <h3 className='text-[32px]'>{data}</h3>
    </div>
  )
}

export default TotalCard
