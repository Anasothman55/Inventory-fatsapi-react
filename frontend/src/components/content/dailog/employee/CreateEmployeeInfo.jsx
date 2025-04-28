
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import ErrorComponents from "../../ErrorComponents"
import DatePicker from "@/container/DatePicker"
import { Textarea } from "@/components/ui/textarea"

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
    mutation.mutate({email, phone_number, address,hire_date, job_title, date_of_birth,salary,note})
  }

  const handleCancel = () =>{
    nav(`/employees/${uid}`)
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
      nav(`/employees/${uid}`)
    }

  },[mutation.isSuccess,])

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-[30px]">{name}</CardTitle>
        <CardDescription>Add Info for {name}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4 mb-8">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Emial</Label>
              <Input id="email" name="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input id="phone_number" 
                placeholder="07XX-XXX-XXXX"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input id="address" 
                placeholder="Suly"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="hire_date">Hire Date</Label>
              <DatePicker new_date={hire_date} setDate={setHireDate} />
            </div>
            <div className="flex flex-col space-y-1.5"> 
              <Label htmlFor="job_title">Job Title</Label>
              <Input id="job_title" 
                placeholder="Worker"
                value={job_title}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <DatePicker new_date={date_of_birth} setDate={setDateOfBrith}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="salary">Salary</Label>
              <Input id="salary" type="number" min={0}
                placeholder="0.00"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5 w-full max-w-full overflow-hidden">
              <Label htmlFor="note">Note</Label>
              <Textarea   wrap="soft" id="note" value={note} onChange={e=> setNote(e.target.value)}/>
            </div>
            
          </div>

          <div  className="flex justify-between">
            <Button variant="outline" type="button" onClick={handleCancel}>Cancel</Button>
            <Button type="submit">Add</Button>
          </div>

          <div>
            {
              mutation.isError && (
                <ErrorComponents error={mutation.error}  className="mt-4" />
              )
            }
          </div>
        </form>
      </CardContent>

    </Card>
  )
}

export default CreateEmployeeInfo
