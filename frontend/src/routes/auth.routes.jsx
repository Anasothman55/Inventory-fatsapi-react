
import axios from 'axios';
import qs from 'qs';

const baseUrl = "http://localhost:8000"
const hostUrl = "http://192.168.135.191:8000"

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









