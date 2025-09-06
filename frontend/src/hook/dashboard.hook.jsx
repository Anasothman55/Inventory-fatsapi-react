import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '@/routes/url';

const itemsApi = axios.create({
  baseURL: `${baseUrl}/dashboard`, 
  withCredentials: true
});


export const getAllDashboard = async ( )=>{
  const res = await itemsApi.get()
  return res.data
}


export const useDashboardData = () =>(
  useQuery({
    queryKey: ["dashboard-all"],
    queryFn: () => getAllDashboard(),
    staleTime: 1000,
    retry: false,
  })
)





