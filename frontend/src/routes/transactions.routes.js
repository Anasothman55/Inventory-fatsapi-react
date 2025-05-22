
import axios from 'axios';
import qs from 'qs';


const baseUrl = "http://localhost:8000"
//const hostUrl = "http://192.168.135.191:8000"



const transactionsApi = axios.create({
  baseURL: `${baseUrl}/transactions`, 
  withCredentials: true
});


export const getAllTransactionRes = async (params = {})=>{
  const res = await transactionsApi.get(`/?order_by=created_at&order=desc`, {params})
  return res.data
}


export const getOneTransactionRes = async (id)=>{
  const res = await transactionsApi.get(`/${id}`)
  return res.data
}


export const createTransactionRes = async (item_uid,quantity,action_type,transaction_date,transaction_time,employee_uid,note)=>{
  
  return await transactionsApi.post(
    `/${item_uid}`, 
    qs.stringify({quantity,action_type,transaction_date,transaction_time,employee_uid,note}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}

  
export const updateTransactionRes = async (uid,quantity,transaction_date,transaction_time,note,)=>{
  return await transactionsApi.patch(
    `/${uid}`, 
    qs.stringify({quantity,transaction_date,transaction_time,note,}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const deleteTransactionRes = async (id)=>{
  const res = await transactionsApi.delete(`/${id}`)
  return res.data
}
