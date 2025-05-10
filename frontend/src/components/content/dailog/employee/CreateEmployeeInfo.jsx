
import { useSetEmployeeInfo } from "@/hook/employee"

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

const CreateEmployeeInfo = ({uid,name}) => {
  const [email, setEmail] = useState("")
  const [phone_number, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [hire_date, setHireDate] = useState(new Date())
  const [job_title, setJobTitle] = useState("")
  const [date_of_birth, setDateOfBrith] = useState(new Date())
  const [salary, setSalary] = useState(0.00)
  const [note, setNote] = useState("")
  
  const nav = useNavigate()

  const mutation = useSetEmployeeInfo(uid)
  const handleSubmit = (e) => {
    e.preventDefault()
    if(phone_number.length === 0){
      toast.error("Phone number is required")
      return
    }
    mutation.mutate({email, phone_number, address,hire_date, job_title, date_of_birth,salary,note})
  }

  const handleCancel = () =>{
    nav(`/employees`)
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

      toast.success(`Added info to ${name} succsessfully`)
      setTimeout(()=>{
        nav(`/employees/${uid}`)
      }, 1000)
    }

  },[mutation.isSuccess,])

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-[30px]">{name}</CardTitle>
        <CardDescription>Add Info for {name}</CardDescription>
      </CardHeader>
      <EmployeeInfoMutateContainer
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        mutation={mutation} 
        name={name}
        uid={uid}
        email={email} setEmail={setEmail}
        phone_number={phone_number} setPhoneNumber={setPhoneNumber}
        address={address} setAddress={setAddress}
        hire_date={hire_date} setHireDate={setHireDate}
        job_title={job_title} setJobTitle={setJobTitle}
        date_of_birth={date_of_birth} setDateOfBrith={setDateOfBrith}
        salary={salary} setSalary={setSalary}
        note={note} setNote={setNote}
        btn="Create"
      />

    </Card>
  )
}

export default CreateEmployeeInfo
