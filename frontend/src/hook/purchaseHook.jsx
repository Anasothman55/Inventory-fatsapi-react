import { getAllItemsRes,createItemsRes,getOneItemsRes,updateItemsRes, deleteItemRes } from "@/routes/items.routes"
import {
  createPurchaseItemRes,
  createPurchaseRes,
  deletePurchaseItemRes,
  deletePurchaseRes,
  getAllPurchaseRes,
  getOnePurchaseItemRes,
  getOnePurchaseRes,
  updatePurchaseItemRes,
  updatePurchaseRes
} from "@/routes/purchase.routes"
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


export const useUpdatePurchase = (uid) => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({purchasing_plase,purchaser,beneficiary,curuncy_type,total_price,receipt_number,recipient,note,purchase_date}) => {
      return await updatePurchaseRes(uid,purchasing_plase,purchaser,beneficiary,curuncy_type,total_price,receipt_number,recipient,note,purchase_date)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases',uid])
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



export const useSetPurchaseItems = (uid) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({item_uid,new_name,unit,category_uid,quantity,unite_price,note,}) => {
      
      return await createPurchaseItemRes(uid,item_uid,new_name,unit,category_uid,quantity,unite_price,note,)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases',uid])
    }
  })
}

export const usePurchaseItemOneData = (id) =>(
  useQuery({
    queryKey: ["purchases-item", id],
    queryFn: () => getOnePurchaseItemRes(id),
    staleTime: 10000,
    retry: false,
  })
)


export const useUpdatePurchaseItems = (uid) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({quantity,unite_price,note,}) => {
      return await updatePurchaseItemRes(uid,quantity,unite_price,note,)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases',uid])
    }
  })
}


export const useDeletePurchaseItem = (uid) =>{
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const res = await deletePurchaseItemRes(uid)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases', uid]) // adjust key as needed
    }
  })
}

