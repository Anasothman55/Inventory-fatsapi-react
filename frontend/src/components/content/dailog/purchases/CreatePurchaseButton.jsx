
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import PurchaseMutateContainer from "@/container/PurchaseMutateContainer"

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



  const mutation = useSetPurchase()
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({purchasing_plase,purchaser,beneficiary,curuncy_type,total_price,receipt_number,recipient,note,purchase_date})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
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

    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-[30px]">Add new Purchase</CardTitle>
        
        <CardTitle>for add new purchase you need fill all text box</CardTitle>
      </CardHeader>
      <PurchaseMutateContainer
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

    </Card>
  )
}

export default CreatePurchaseButton
