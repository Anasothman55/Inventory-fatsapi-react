
import { createEmployeeInfoRes, createEmployeeRes, deleteEmployeeRes, getAllEmployeesRes, getOneEmployeeRes } from "@/routes/employee.route"
import { createItemsRes,getOneItemsRes,updateItemsRes, deleteItemRes } from "@/routes/items.routes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"




export const useEmployeesData = () =>(
  useQuery({
    queryKey: ["employees-all"],
    queryFn: () => getAllEmployeesRes(),
    staleTime: 10000,
    retry: false,
  })
)


export const useEmployeeOneData = (id) =>(
  useQuery({
    queryKey: ["employees", id],
    queryFn: () => getOneEmployeeRes(id),
    staleTime: 10000,
    retry: false,
  })
)



export const useSetEmployee = () => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({name}) => {
      const res = await createEmployeeRes(name)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['employees-all'])
    }
  })
}


export const useUpdateEmployee = (uid) => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({item_name, stock, unit, minimum_stock_level, description,category_uid}) => {
      const res = await updateItemsRes(uid,item_name, stock, unit, minimum_stock_level, description,category_uid)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['employees-all',uid])
    }
  })
}


export const useDeleteEmployee = () =>{
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({uid}) => {
      const res = await deleteEmployeeRes(uid)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['employees-all']) // adjust key as needed
    }
  })
}




export const useSetEmployeeInfo = (id) => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({email, phone_number, address,hire_date, job_title, date_of_birth,salary,note}) => {
      const res = await createEmployeeInfoRes(id,email, phone_number, address,hire_date, job_title, date_of_birth,salary,note)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees", id])
    }
  })
}



