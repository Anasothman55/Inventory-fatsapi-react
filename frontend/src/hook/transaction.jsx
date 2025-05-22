

import { updateItemsRes, deleteItemRes } from "@/routes/items.routes"
import { createTransactionRes, deleteTransactionRes, getAllTransactionRes, getOneTransactionRes, updateTransactionRes } from "@/routes/transactions.routes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"




export const useTransactionsData = (filters = {}) =>(
  useQuery({
    queryKey: ["transactions-all", filters],
    queryFn: () => getAllTransactionRes(filters),
    staleTime: 10000,
    retry: false,
  })
)



export const useTransactionOneData = (id) =>(
  useQuery({
    queryKey: ["transactions", id],
    queryFn: () => getOneTransactionRes(id),
    staleTime: 10000,
    retry: false,
  })
)



export const useSetTransaction = () => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({item_uid,quantity,action_type,transaction_date,transaction_time,employee_uid,note}) => {
      const res = await createTransactionRes(item_uid,quantity,action_type,transaction_date,transaction_time,employee_uid,note)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions-all'])
    }
  })
}


export const useUpdateTransaction = (uid) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({quantity,transaction_date,transaction_time,note,}) => {
      
      const res = await updateTransactionRes(uid,quantity,transaction_date,transaction_time,note,)
      return res
    },  
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions-all'])
    }
  })
}


export const useDeleteTransaction = () =>{
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({uid}) => {
      await deleteTransactionRes(uid)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['items-all']) 
    }
  })
}




