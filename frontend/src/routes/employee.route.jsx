
import axios from 'axios';
import qs from 'qs';


const baseUrl = "http://localhost:8000"
const hostUrl = "http://192.168.135.191:8000"


const itemsApi = axios.create({
  baseURL: `${baseUrl}/employees`, 
  withCredentials: true
});


export const getAllEmployeesRes = async ( )=>{
  const res = await itemsApi.get(`/?order_by=created_at&order=desc`)
  return res.data
}

export const getOneEmployeeRes = async (id)=>{
  const res = await itemsApi.get(`/${id}`)
  return res.data
}


export const createEmployeeRes = async (name)=>{
  
  return await itemsApi.post(
    "/", 
    qs.stringify({name}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const updateItemsRes = async (uid,item_name, stock, unit, minimum_stock_level, description,category_uid)=>{
  return await itemsApi.patch(
    `/${uid}`, 
    qs.stringify({item_name, stock, unit, minimum_stock_level, description,category_uid}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const deleteItemRes = async (id)=>{
  const res = await itemsApi.delete(`/${id}`)
  return res.data
}





