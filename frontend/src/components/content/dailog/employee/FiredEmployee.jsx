
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import ErrorComponents from "../../ErrorComponents"
import DatePicker from "@/container/DatePicker"
import { Textarea } from "@/components/ui/textarea"
import EmployeeInfoMutateContainer from "@/container/EmployeeInfoMutateContainer"


import React from 'react'
import { useFiredEmployeeInfo } from "@/hook/employee"
import { InlineIcon } from "@iconify/react"




const FiredEmployee = ({data}) => {

  
  const nav = useNavigate()

  const mutation = useFiredEmployeeInfo(data.uid)
  const handleSubmit = (e) => {
    e.preventDefault()
    const fired_date = new Date().toISOString().split('T')[0];
    mutation.mutate({fired_date})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      toast.success(`Fired ${data.name} succsessfully`)
      nav(`/employees/${data.uid}`)
    }

  },[mutation.isSuccess,])

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <Button disabled={data?.employee_info_model?.fired_date} type="submit" className={`hover:bg-white cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1  ring-offset-2 hover:text-rose-700 hover:border-rose-700 `}  variant="outline"> <span> <InlineIcon icon={"mage:user-cross"}/></span>Fired</Button>
      </form>
      
    </div>
    
  )
}

export default FiredEmployee
