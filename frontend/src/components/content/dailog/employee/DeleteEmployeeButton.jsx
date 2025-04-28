

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import ConfirmPopupContainer from "@/container/ConfirmPopupContainer"
import { useDeleteCategory } from "@/hook/categoryHook"
import { useDeleteEmployee } from "@/hook/employee"
import { InlineIcon } from "@iconify/react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


const DeleteEmployeeButton = ({name, uid}) => {
  const nav = useNavigate()
  const deleteMutate = useDeleteEmployee()
  
  const handleDelete = ()=>{
    deleteMutate.mutate({uid})
  }

  useEffect(()=>{
    if(deleteMutate.isSuccess){
      nav('/employees')
      toast.success(`Employee ${name} has ben delete succsessfully`)
    }
  },[deleteMutate.isSuccess])
  
  if(deleteMutate.error?.code){
    toast.error(deleteMutate.error.code)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button className="hover:bg-white cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1  ring-offset-2 hover:text-rose-700 hover:border-rose-700"  variant="outline"> <span> <InlineIcon icon={"fluent:delete-16-filled"}/></span>Delete</Button>
      </AlertDialogTrigger>
        <ConfirmPopupContainer 
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete the employee with his info and remove the data on the server."
          handleContinue={handleDelete}
        />
    </AlertDialog>
  )
}

export default DeleteEmployeeButton
