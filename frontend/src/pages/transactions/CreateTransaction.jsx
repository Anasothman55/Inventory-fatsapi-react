import CreateTransactionDailog from '@/components/content/dailog/transactions/CreateTransactionDailog';
import React from 'react'
import { useSearchParams } from 'react-router-dom';

const CreateTransaction = () => {

  

  const [searchParams] = useSearchParams();

  const type = searchParams.get('type')
  
  if ( type === 'intake' ) {
    
    return (
      <div className='flex justify-center w-full pt-10 '>
        <CreateTransactionDailog action_type={'return'}/>
      </div>
    )
  } else if (type === 'outtake') {
    return (
      <div className='flex justify-center w-full pt-10 '>
        <CreateTransactionDailog action_type={'use'}/>
      </div>
    )
  }


}

export default CreateTransaction
  