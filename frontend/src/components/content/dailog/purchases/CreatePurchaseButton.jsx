
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
import PurchaseMutateContainer from "@/container/PurchaseMutateContainer"

import { useSetItems } from "@/hook/itemsHook"
import { useSetPurchase } from "@/hook/purchaseHook"
import { InlineIcon } from "@iconify/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"


const CreatePurchaseButton = () => {
  
  const [purchasing_plase , setPurchasing_plase ] = useState("")
  const [purchaser, setPurchaser] = useState("")
  const [beneficiary , setBeneficiary ] = useState("")
  const [curuncy_type , setCuruncy_type ] = useState("")
  const [total_price , setTotal_price ] = useState(0.00)
  const [recipient , setRecipient ] = useState("")
  const [receipt_number , setReceipt_number ] = useState(0)
  const [note, setNote] = useState("")
  const [purchase_date, setPurchase_date] = useState(new Date())

  const [open, setOpen] = useState(false)


  const mutation = useSetPurchase()
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({purchasing_plase,purchaser,beneficiary,curuncy_type,total_price,receipt_number,recipient,note,purchase_date})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      setOpen(false)
      setPurchasing_plase("")
      setPurchaser("")
      setBeneficiary("")
      setCuruncy_type("")
      setTotal_price(0.00)
      setReceipt_number(0)
      setRecipient("")
      setNote("")
      setPurchase_date(new Date())

      toast.success("Purchase create succsessfully")
    }

  },[mutation.isSuccess,])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-emerald-700 hover:border-emerald-700 hover:bg-white"  variant="outline"> <span> <InlineIcon icon={"gala:add"}/></span> Add Purchase</Button>
      </DialogTrigger>
      <PurchaseMutateContainer
        title={"Create New Purchase"}
        des={"For creating purchase you need to fill this form"}
        mutation={mutation}
        handleSubmit={handleSubmit}
        btn="Create"
        purchasing_plase={purchasing_plase}
        setPurchasing_plase={setPurchasing_plase}
        purchaser = {purchaser}
        setPurchaser = {setPurchaser}
        beneficiary = {beneficiary}
        setBeneficiary = {setBeneficiary}
        curuncy_type = {curuncy_type}
        setCuruncy_type = {setCuruncy_type}
        total_price ={total_price}
        setTotal_price ={setTotal_price}
        recipient ={recipient}
        setRecipient ={setRecipient}
        receipt_number ={receipt_number}
        setReceipt_number ={setReceipt_number}
        note ={note}
        setNote ={setNote}
        purchase_date ={purchase_date}
        setPurchase_date ={setPurchase_date}
      />
    </Dialog>
  )
}

export default CreatePurchaseButton
