
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import PurchaseMutateContainer from "@/container/PurchaseMutateContainer"

import {useSetPurchase, useUpdatePurchase} from "@/hook/purchaseHook"
import { InlineIcon } from "@iconify/react"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"




const UpdatePurchaseButton = ({data}) => {

  const [purchasing_plase , setPurchasing_plase ] = useState(data?.purchasing_plase)
  const [purchaser, setPurchaser] = useState(data?.purchaser)
  const [beneficiary , setBeneficiary ] = useState(data?.beneficiary)
  const [curuncy_type , setCuruncy_type ] = useState(data?.curuncy_type)
  const [total_price , setTotal_price ] = useState(data?.total_price)
  const [recipient , setRecipient ] = useState(data?.recipient)
  const [receipt_number , setReceipt_number ] = useState(data?.receipt_number)
  const [note, setNote] = useState(data?.note)
  const [purchase_date, setPurchase_date] = useState(data?.purchase_date)

  const nav = useNavigate()


  const mutation = useUpdatePurchase(data?.uid)
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({purchasing_plase,purchaser,beneficiary,curuncy_type,total_price,receipt_number,recipient,note,purchase_date})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      setPurchasing_plase(data?.purchasing_plase)
      setPurchaser(data?.purchaser)
      setBeneficiary(data?.beneficiary)
      setCuruncy_type(data?.curuncy_type)
      setTotal_price(data?.total_price)
      setReceipt_number(data?.receipt_number)
      setRecipient(data?.recipient )
      setNote(data?.note)
      setPurchase_date(data?.purchase_date)

      toast.success(`Purchase ${data?.purchasing_plase} Update succsessfully`)
      nav(`/purchase/${data?.uid}`)
    }

  },[mutation.isSuccess,])


  return (

    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-[30px]">Update {data?.purchasing_plase}</CardTitle>
        
        <CardDescription>for updating purchase replace the old value with new one</CardDescription>
      </CardHeader>
      <PurchaseMutateContainer
        title={`${data?.receipt_number} : ${data?.purchasing_plase}`}
        des={"For updating purchase you need to change this form input"}
        mutation={mutation}
        handleSubmit={handleSubmit}
        btn="Update"
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
export default UpdatePurchaseButton
