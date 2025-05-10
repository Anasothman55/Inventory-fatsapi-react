


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

import DatePicker from "@/container/DatePicker"
import { Textarea } from "@/components/ui/textarea"
import { ErrorComponents } from "@/components/content"
import DeleteEmployeeButton from "@/components/content/dailog/employee/DeleteEmployeeButton"





const EmployeeInfoMutateContainer = ({handleSubmit,handleCancel,mutation, btn,name,uid, ...props}) => {
  return (
    <CardContent className="">
      <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4 mb-8">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Emial</Label>
              <Input id="email" name="email"
                placeholder="example@email.com"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input id="phone_number" 
                placeholder="07XX-XXX-XXXX"
                value={props.phone_number}
                onChange={(e) => props.setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input id="address" 
                placeholder="Suly"
                value={props.address}
                onChange={(e) => props.setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="hire_date">Hire Date</Label>
              <DatePicker new_date={props.hire_date} setDate={props.setHireDate} />
            </div>
            <div className="flex flex-col space-y-1.5"> 
              <Label htmlFor="job_title">Job Title</Label>
              <Input id="job_title" 
                placeholder="Worker"
                value={props.job_title}
                onChange={(e) => props.setJobTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <DatePicker new_date={props.date_of_birth} setDate={props.setDateOfBrith}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="salary">Salary</Label>
              <Input id="salary" type="number" min={0}
                placeholder="0.00"
                value={props.salary}
                onChange={(e) => props.setSalary(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5 w-full max-w-full overflow-hidden">
              <Label htmlFor="note">Note</Label>
              <Textarea  wrap="soft" id="note" value={props.note} onChange={e=> props.setNote(e.target.value)}/>
            </div>
            
          </div>

          <div  className="flex justify-between">
            <Button variant="outline" type="button" onClick={handleCancel}>Cancel</Button>
            <Button type="submit">{btn}</Button>
          </div>

          <div className="pt-4">
            {
              mutation.isError && (
                <ErrorComponents error={mutation.error}  className="mt-4" />
              )
            }
          </div>
          
      </form>
      <div className="w-full mt-5">
        <DeleteEmployeeButton style="w-full" name={name} uid={uid}/>
      </div>
    </CardContent>
  )
}

export default EmployeeInfoMutateContainer
