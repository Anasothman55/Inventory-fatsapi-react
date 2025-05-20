


import axios from 'axios';
import qs from 'qs';


const baseUrl = "http://localhost:8000"
const hostUrl = "http://192.168.135.191:8000"


const purchaseApi = axios.create({
  baseURL: `${baseUrl}/purchases`, 
  withCredentials: true
});
const purchaseItemApi = axios.create({
  baseURL: `${baseUrl}/purchase-items`,
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


export const updatePurchaseRes = async (uid, purchasing_plase,purchaser,beneficiary,curuncy_type,total_price,receipt_number,recipient,note,purchase_date)=>{
  return await purchaseApi.patch(
    `/${uid}`, 
    qs.stringify({purchasing_plase,purchaser,beneficiary,curuncy_type,total_price,receipt_number,recipient,note,purchase_date}),
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


export const getOnePurchaseItemRes = async (id)=>{
  const res = await purchaseItemApi.get(`/${id}`)
  return res.data
}

export const deletePurchaseItemRes = async (id)=>{
  const res = await purchaseItemApi.delete(`/${id}`)
  return res.data
}

export const createPurchaseItemRes = async (id, item_uid,new_name,unit,category_uid,quantity,unite_price,note,)=>{
  return await purchaseItemApi.post(
    `/${id}`,
    qs.stringify({item_uid,new_name,unit,category_uid,quantity,unite_price,note,}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}

export const updatePurchaseItemRes = async (id, quantity,unite_price,note,)=>{
  return await purchaseItemApi.patch(
    `/${id}`,
    qs.stringify({quantity,unite_price,note,}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}





