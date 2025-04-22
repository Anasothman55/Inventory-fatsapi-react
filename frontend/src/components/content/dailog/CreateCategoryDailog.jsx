

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
import { useSetCategory } from "@/hook/categoryHook"
import { InlineIcon } from "@iconify/react"
import { useEffect, useState } from "react"
import ErrorComponents from "../ErrorComponents"
import { toast } from "sonner"
import { CategoryMutataeContainer } from "@/container"


const CreateCategoryDailog = () => {

  const [nameV, setNamEv] = useState( '')
  const [open, setOpen] = useState(false)


  const mutation = useSetCategory()
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({nameV})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      setOpen(false)
      setNamEv('')
      toast.success("Category create succsessfully")
    }

  },[mutation.isSuccess,])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-emerald-700 hover:border-emerald-700"  variant="outline"> <span> <InlineIcon icon={"gala:add"}/></span> Add Category</Button>
      </DialogTrigger>
      <CategoryMutataeContainer
        title="Create Category"
        description="Create a new category"
        mutation={mutation}  
        handleSubmit={handleSubmit} 
        nameV={nameV} 
        setNamEv={setNamEv}
        btn="Create"
      />
    </Dialog>
  )
}

export default CreateCategoryDailog
