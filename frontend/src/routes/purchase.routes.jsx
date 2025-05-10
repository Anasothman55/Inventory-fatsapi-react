


import axios from 'axios';
import qs from 'qs';


const baseUrl = "http://localhost:8000"
const hostUrl = "http://192.168.135.191:8000"


const purchaseApi = axios.create({
  baseURL: `${baseUrl}/purchases`, 
  withCredentials: true
});


export const getAllPurchaseRes = async ( )=>{
  const res = await purchaseApi.get(`/?order_by=created_at&order=desc`)
  return res.data
}

export const getOnePurchaseRes = async (id)=>{
  const res = await purchaseApi.get(`/${id}`)
  return res.data
}


export const createPurchaseRes = async (purchasing_plase,purchaser,beneficiary,curuncy_type,total_price,receipt_number,recipient,note,purchase_date)=>{
  
  return await purchaseApi.post(
    "/", 
    qs.stringify({purchasing_plase,purchaser,beneficiary,curuncy_type,total_price,receipt_number,recipient,note,purchase_date}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const updateItemsRes = async (uid,item_name, stock, unit, minimum_stock_level, description,category_uid)=>{
  return await purchaseApi.patch(
    `/${uid}`, 
    qs.stringify({item_name, stock, unit, minimum_stock_level, description,category_uid}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const deletePurchaseRes = async (id)=>{
  const res = await purchaseApi.delete(`/${id}`)
  return res.data
}







