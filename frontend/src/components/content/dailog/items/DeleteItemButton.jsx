
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import ConfirmPopupContainer from "@/container/ConfirmPopupContainer"
import { useDeleteItems } from "@/hook/itemsHook"
import { InlineIcon } from "@iconify/react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"



const DeleteItemButton = ({uid, name}) => {
  const nav = useNavigate()
  const deleteMutate = useDeleteItems()
  
  const handleDelete = ()=>{
    deleteMutate.mutate({uid})
  }

  useEffect(()=>{
    if(deleteMutate.isSuccess){
      nav('/items')
      toast.success(`Item ${name} has ben delete succsessfully`)
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
          description="This action cannot be undone. This will permanently delete the item and remove the data on the server."
          handleContinue={handleDelete}
        />
    </AlertDialog>
  )
}

export default DeleteItemButton
