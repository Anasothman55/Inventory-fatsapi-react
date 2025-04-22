
import React from 'react'



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
import {  useUpdateCategory } from "@/hook/categoryHook"
import { InlineIcon } from "@iconify/react"
import { useEffect, useState } from "react"
import ErrorComponents from "../ErrorComponents"
import { toast } from 'sonner'
import { CategoryMutataeContainer } from '@/container'


const UpdateCategory = ({name, uid}) => {

  const [nameV, setNamEv] = useState(name)
  const [open, setOpen] = useState(false)

  
  const mutation = useUpdateCategory(uid)
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({nameV})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      setOpen(false)
      setNamEv('')
      toast.success("Category update succsessfully")
    }

  },[mutation.isSuccess,])

  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:bg-white  cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-yellow-500 hover:border-yellow-500 "   variant="outline"> <span> <InlineIcon icon={"radix-icons:update"}/></span> Update Category</Button>
      </DialogTrigger>
      <CategoryMutataeContainer
        title="Update Category"
        description="Update the category name"
        mutation={mutation}  
        handleSubmit={handleSubmit} 
        nameV={nameV} 
        setNamEv={setNamEv}
        btn="Update"
      />
    </Dialog>
  )
}

export default UpdateCategory
