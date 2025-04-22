import { getAllItemsRes,createItemsRes,getOneItemsRes,updateItemsRes, deleteItemRes } from "@/routes/items.routes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"




export const useItemsData = () =>(
  useQuery({
    queryKey: ["items-all"],
    queryFn: () => getAllItemsRes(),
    staleTime: 10000,
    retry: false,
  })
)


export const useItemsOneData = (id) =>(
  useQuery({
    queryKey: ["items", id],
    queryFn: () => getOneItemsRes(id),
    staleTime: 10000,
    retry: false,
  })
)



export const useSetItems = () => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({item_name, intStock, unit, minimumStockLevel, description,category_uid}) => {
      const res = await createItemsRes(item_name, intStock, unit, minimumStockLevel, description,category_uid)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['items-all'])
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
