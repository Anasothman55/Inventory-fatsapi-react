import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCategoryRes, deleteCategoryRes, getAllCategoriesRes, getOneCategoryRes, updateCategoryRes } from "../routes/category.routes"




export const useCategoryData = () =>(
  useQuery({
    queryKey: ["categories-all"],
    queryFn: () => getAllCategoriesRes(),
    staleTime: 10000,
    retry: false,
  })
)


export const useCategoryOneData = (id) =>(
  useQuery({
    queryKey: ["categories-all", id],
    queryFn: () => getOneCategoryRes(id),
    staleTime: 10000,
    retry: false,
  })
)



export const useSetCategory = () => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({nameV}) => {
      const res = await createCategoryRes(nameV)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['categories-all'])
    }
  })
}


export const useUpdateCategory = (uid) => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({nameV}) => {
      const res = await updateCategoryRes(uid,nameV)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['categories-all',uid])
    }
  })
}


export const useDeleteCategory = () =>{
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({uid}) => {
      const res = await deleteCategoryRes(uid)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['categories-all']) // adjust key as needed
    }
  })
}
