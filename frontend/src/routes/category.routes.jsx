
import axios from 'axios';
import qs from 'qs';


const baseUrl = "http://localhost:8000"
const hostUrl = "http://192.168.135.191:8000"


const categoryApi = axios.create({
  baseURL: `${baseUrl}/categories`, 
  withCredentials: true
});


export const getAllCategoriesRes = async ( )=>{
  const res = await categoryApi.get(`/?order_by=created_at&order=desc`)
  return res.data
}

export const getOneCategoryRes = async (id)=>{
  const res = await categoryApi.get(`/${id}`)
  return res.data
}


export const createCategoryRes = async (nameV)=>{
  return await categoryApi.post(
    "/", 
    qs.stringify({name: nameV}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const updateCategoryRes = async (uid,nameV)=>{
  return await categoryApi.patch(
    `/${uid}`, 
    qs.stringify({name: nameV}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const deleteCategoryRes = async (id)=>{
  const res = await categoryApi.delete(`/${id}`)
  return res.data
}
