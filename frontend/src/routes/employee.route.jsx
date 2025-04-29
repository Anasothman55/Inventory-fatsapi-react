
import axios from 'axios';
import qs from 'qs';


const baseUrl = "http://localhost:8000"
//const hostUrl = "http://192.168.135.191:8000"


const empApi = axios.create({
  baseURL: `${baseUrl}/employees`, 
  withCredentials: true
});


export const getAllEmployeesRes = async ( )=>{
  const res = await empApi.get(`/?order_by=created_at&order=desc`)
  return res.data
}

export const getOneEmployeeRes = async (id)=>{
  const res = await empApi.get(`/${id}`)
  return res.data
}


export const createEmployeeRes = async (name)=>{
  
  return await empApi.post(
    "/", 
    qs.stringify({name}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const updateEmployeeRes = async (uid,name)=>{
  return await empApi.patch(
    `/${uid}`, 
    qs.stringify({name}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const deleteEmployeeRes = async (id)=>{
  const res = await empApi.delete(`/${id}`)
  return res.data
}





export const createEmployeeInfoRes = async (uid, email, phone_number, address,hire_date, job_title, date_of_birth,salary,note)=>{
  return await empApi.post(
    `/employee-info/${uid}`, 
    qs.stringify({email, phone_number, address,hire_date, job_title, date_of_birth,salary,note}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const updateEmployeeInfoRes = async (uid, email, phone_number, address,hire_date, job_title, date_of_birth,salary,note)=>{
  return await empApi.patch(
    `/employee-info/${uid}`, 
    qs.stringify({email, phone_number, address,hire_date, job_title, date_of_birth,salary,note}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const firedEmployeeInfoRes = async (uid, fired_date)=>{
  return await empApi.patch(
    `/employee-info/${uid}`, 
    qs.stringify({fired_date}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}