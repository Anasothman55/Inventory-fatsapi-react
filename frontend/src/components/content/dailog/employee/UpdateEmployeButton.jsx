



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
import { useSetEmployee, useUpdateEmployee } from "@/hook/employee"

import { InlineIcon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"



const UpdateEmployeButton = ({names,uid}) => {
  const [name, setNamEv] = useState(names)
  const [open, setOpen] = useState(false)
  
  const mutation = useUpdateEmployee(uid)
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({name})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      setOpen(false)
      setNamEv(mutation.data.data.name)
      toast.success("Employee name update succsessfully")
    }

  },[mutation.isSuccess,])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:bg-white  cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-yellow-500 hover:border-yellow-500 "   variant="outline"> <span> <InlineIcon icon={"radix-icons:update"}/></span> Update Name</Button>
      </DialogTrigger>
      <EmployeeMutateContainer
        title="Employee"
        description="Update name employee"
        mutation={mutation}  
        handleSubmit={handleSubmit} 
        name={name} 
        setNamEv={setNamEv}
        btn="Update"
      />
    </Dialog>
  )
}

export default UpdateEmployeButton
