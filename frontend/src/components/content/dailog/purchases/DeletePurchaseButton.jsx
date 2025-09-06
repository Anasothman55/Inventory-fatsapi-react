


import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import ConfirmPopupContainer from "@/container/ConfirmPopupContainer"
import { useDeletePurchase } from "@/hook/purchaseHook"
import { InlineIcon } from "@iconify/react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import ErrorComponents from "../../ErrorComponents"

const DeletePurchaseButton = ({uid, name}) => {
  const nav = useNavigate()
  const deleteMutate = useDeletePurchase()
  

  const handleDelete = ()=>{
    deleteMutate.mutate({uid})
  }

  useEffect(()=>{
    if(deleteMutate.isSuccess){
      nav('/purchase')
      toast.success(`Purchase ${name} has ben delete succsessfully`)
    }
  },[deleteMutate.isSuccess])
  
  if(deleteMutate.isError){
    toast.error(deleteMutate.error.response?.data?.detail?.error)
  }



  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button className="hover:bg-white cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1  ring-offset-2 hover:text-rose-700 hover:border-rose-700"  variant="outline"> <span> <InlineIcon icon={"fluent:delete-16-filled"}/></span>Delete</Button>
      </AlertDialogTrigger>
        <ConfirmPopupContainer 
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete the purchase and remove the data on the server."
          handleContinue={handleDelete}
        />
    </AlertDialog>
  )
}

export default DeletePurchaseButton




