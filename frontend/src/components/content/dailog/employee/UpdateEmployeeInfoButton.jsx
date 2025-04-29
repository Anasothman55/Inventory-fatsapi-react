
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
import { useUpdateEmployeeInfo } from "@/hook/employee"

const UpdateEmployeeInfoButton = ({data}) => {
  
  const [email, setEmail] = useState(data?.employee_info_model?.email || "")
  const [phone_number, setPhoneNumber] = useState(data?.employee_info_model?.phone_number || "")
  const [address, setAddress] = useState(data?.employee_info_model?.address || "")
  const [hire_date, setHireDate] = useState(data?.employee_info_model?.hire_date || new Date())
  const [job_title, setJobTitle] = useState(data?.employee_info_model?.job_title || "")
  const [date_of_birth, setDateOfBrith] = useState(data?.employee_info_model?.date_of_birth || new Date())
  const [salary, setSalary] = useState(data?.employee_info_model?.salary || 0.00)
  const [note, setNote] = useState(data?.employee_info_model?.note || "")
  
  const nav = useNavigate()

  const mutation = useUpdateEmployeeInfo(data.uid)
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({email, phone_number, address,hire_date, job_title, date_of_birth,salary,note})
  }

  const handleCancel = () =>{
    nav(`/employees/${data.uid}`)
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      setEmail("")
      setPhoneNumber("")
      setAddress("")
      setHireDate(new Date())
      setJobTitle("")
      setDateOfBrith(new Date())
      setSalary(0.00)
      setNote("")

      toast.success(`Update info for ${data.name} succsessfully`)
      nav(`/employees/${data.uid}`)
    }

  },[mutation.isSuccess,])

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-[30px]">{data.name}</CardTitle>
        
        <CardDescription>Add Info for {data.name}</CardDescription>
      </CardHeader>
      <EmployeeInfoMutateContainer
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        mutation={mutation} 
        name={data.name}
        uid={data.uid}
        email={email} setEmail={setEmail}
        phone_number={phone_number} setPhoneNumber={setPhoneNumber}
        address={address} setAddress={setAddress}
        hire_date={hire_date} setHireDate={setHireDate}
        job_title={job_title} setJobTitle={setJobTitle}
        date_of_birth={date_of_birth} setDateOfBrith={setDateOfBrith}
        salary={salary} setSalary={setSalary}
        note={note} setNote={setNote}
        btn="Update"
      />

    </Card>
  )
}

export default UpdateEmployeeInfoButton
