import { getAllItemsRes,createItemsRes,getOneItemsRes,updateItemsRes, deleteItemRes } from "@/routes/items.routes"
import { createPurchaseRes, deletePurchaseRes, getAllPurchaseRes, getOnePurchaseRes } from "@/routes/purchase.routes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"




export const usePurchaseData = () =>(
  useQuery({
    queryKey: ["purchases-all"],
    queryFn: () => getAllPurchaseRes(),
    staleTime: 10000,
    retry: false,
  })
)


export const usePurchaseOneData = (id) =>(
  useQuery({
    queryKey: ["purchases", id],
    queryFn: () => getOnePurchaseRes(id),
    staleTime: 10000,
    retry: false,
  })
)



export const useSetPurchase = () => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({purchasing_plase,purchaser,beneficiary,curuncy_type,total_price,receipt_number,recipient,note,purchase_date}) => {
      const res = await createPurchaseRes(purchasing_plase,purchaser,beneficiary,curuncy_type,total_price,receipt_number,recipient,note,purchase_date)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases-all'])
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


export const useDeletePurchase = () =>{
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({uid}) => {
      const res = await deletePurchaseRes(uid)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases-all']) // adjust key as needed
    }
  })
}
