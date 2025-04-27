
import { createEmployeeRes, getAllEmployeesRes, getOneEmployeeRes } from "@/routes/employee.route"
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


export const useUpdateItems = (uid) => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({item_name, stock, unit, minimum_stock_level, description,category_uid}) => {
      const res = await updateItemsRes(uid,item_name, stock, unit, minimum_stock_level, description,category_uid)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['items-all',uid])
    }
  })
}


export const useDeleteItems = () =>{
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({uid}) => {
      const res = await deleteItemRes(uid)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['items-all']) // adjust key as needed
    }
  })
}







