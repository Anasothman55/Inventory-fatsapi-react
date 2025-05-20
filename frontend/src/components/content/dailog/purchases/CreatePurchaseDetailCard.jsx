
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import ErrorComponents from "../../ErrorComponents"
import DatePicker from "@/container/DatePicker"
import { Textarea } from "@/components/ui/textarea"
import EmployeeInfoMutateContainer from "@/container/EmployeeInfoMutateContainer"
import PurchaseDetailsMutateContainer from "@/container/PurchaseDetailsMutateContainer.jsx";
import {useSetPurchaseItems} from "@/hook/purchaseHook.jsx";

const CreatePurchaseDetailCard = ({name, uid}) => {
  const [item_uid, setItem_uid] = useState("")
  const [new_name, setNew_name] = useState("")
  const [unit, setUnit] = useState("")
  const [category_uid, setCategory_uid] = useState("")
  const [quantity , setQuantity ] = useState(0)
  const [unite_price , setUnite_price ] = useState(0.00)
  const [note, setNote] = useState("")

  const nav = useNavigate()

  const mutation = useSetPurchaseItems(uid)
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({item_uid,new_name,unit,category_uid,quantity,unite_price,note,})
  }

  const handleCancel = () =>{
    nav(`/purchase/${uid}`)
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      toast.success(`Added info to ${name} succsessfully`)
      setItem_uid("")
      setNew_name("") 
      setUnit("")
      setCategory_uid("")
      setQuantity(0)
      setUnite_price(0.00)
      setNote("")

      nav(`/purchase/${uid}`)
    }

  },[mutation.isSuccess,])

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-[30px]">{name}</CardTitle>
        <CardDescription>Add Detail for {name}</CardDescription>
      </CardHeader>
      <PurchaseDetailsMutateContainer
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        mutation={mutation}
        name={name}
        uid={uid}
        item_uid = {item_uid}
        setItem_uid = {setItem_uid}
        new_name = {new_name}
        setNew_name = {setNew_name}
        unit = {unit}
        setUnit = {setUnit}
        category_uid = {category_uid}
        setCategory_uid = {setCategory_uid}
        quantity = {quantity}
        setQuantity = {setQuantity}
        unite_price = {unite_price}
        setUnite_price = {setUnite_price}
        note = {note}
        setNote = {setNote}
        btn="Create"
      />

    </Card>
  )
}
export default CreatePurchaseDetailCard
