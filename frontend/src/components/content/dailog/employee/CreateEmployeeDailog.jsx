

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChoseCategoryCombo, ItemMutateContainer } from "@/container"
import EmployeeMutateContainer from "@/container/EmployeeMutateContainer"
import { useSetEmployee } from "@/hook/employee"

import { InlineIcon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


const CreateEmployeeDailog = () => {
  const [name, setNamEv] = useState( '')
  const [open, setOpen] = useState(false)
  
  const nav = useNavigate()

  const mutation = useSetEmployee()
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({name})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      setOpen(false)
      setNamEv('')
      toast.success("Redirect to employee page")
      nav(`/employees/${mutation.data.data.uid}`)
      toast.success("Employee create succsessfully")
    }

  },[mutation.isSuccess,])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-emerald-700 hover:border-emerald-700"  variant="outline"> <span> <InlineIcon icon={"gala:add"}/></span> Add Employee</Button>
      </DialogTrigger>
      <EmployeeMutateContainer
        title="Employee"
        description="Create a new employee"
        mutation={mutation}  
        handleSubmit={handleSubmit} 
        nameV={name} 
        setNamEv={setNamEv}
        btn="Create"
      />
    </Dialog>
  )
}

export default CreateEmployeeDailog
