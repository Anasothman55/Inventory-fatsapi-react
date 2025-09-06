
import axios from 'axios';
import qs from 'qs';
import { baseUrl } from './url'; // Adjust the import path as necessary
const authApi = axios.create({
  baseURL: `${baseUrl}/auth`, 
  withCredentials: true
});


export const loginRes = async (email,password)=>{
  return await authApi.post(
    "/login", 
    qs.stringify({email: email, password: password}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
}


export const checkAuthRes = async ()=>{
  return await authApi.get('/check-auth')
}

export const logoutRes = async ()=>{
  return await authApi.post('/logout')
}







