import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../store/useAuthStore"
import { checkAuthRes, loginRes } from "../routes/auth.routes"
import { useEffect, useState } from "react"




export const useLogin = () => {
  
  const login = useAuthStore(s=> s.login)

  return useMutation({
    mutationFn: async ({email, password}) => {
      const res = await loginRes(email, password)
      return res
    },
    onSuccess: (data) => {
      login(data.data)
    }
  })
}


export const useCheckAuth = () => {
  const [isChecked, setIsChecked] = useState(false);
  const {login, logout} = useAuthStore()

  const {data, isLoading, isError} = useQuery(
    {
      queryKey: ["checkAuth"],
      queryFn: checkAuthRes,
      staleTime: Infinity,
      retry: false,
    }
  )

  
  useEffect(() => {
    if (isError) {
      logout();
      setIsChecked(true);
    }

    if (data) {
      login(data.data);
      setIsChecked(true);
    }
  }, [data, isError, login, logout]);
  
  
  return {
    isLoading,
    isChecked,
  };
}





