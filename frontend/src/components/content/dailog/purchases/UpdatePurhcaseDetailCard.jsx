


import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"
import ErrorComponents from "../../ErrorComponents"
import DatePicker from "@/container/DatePicker"
import { Textarea } from "@/components/ui/textarea"
import EmployeeInfoMutateContainer from "@/container/EmployeeInfoMutateContainer"
import PurchaseDetailsMutateContainer from "@/container/PurchaseDetailsMutateContainer.jsx";
import {useSetPurchaseItems, useUpdatePurchaseItems} from "@/hook/purchaseHook.jsx";
import {
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DeletePurchaseItemButton from "./DeletePurchaseItemButton"

const UpdatePurhcaseDetailCard = ({name, uid, data}) => {
  const [item_uid, setItem_uid] = useState(data.item_uid)
  const [quantity , setQuantity ] = useState(data.quantity)
  const [unite_price , setUnite_price ] = useState(data.unite_price)
  const [note, setNote] = useState(data.note)

  const nav = useNavigate()

  const mutation = useUpdatePurchaseItems(uid)
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({quantity,unite_price,note,})
  }

  const handleCancel = () =>{
    nav(`/purchase/${data.purchas_uid}`)
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      toast.success(`Update info to ${name} succsessfully`)
      setItem_uid("")
      setQuantity(0)
      setUnite_price(0.00)
      setNote("")

      nav(`/purchase/${data.purchas_uid}`)
    }

  },[mutation.isSuccess,])

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-[30px]">{name}</CardTitle>
        <CardDescription>Add Detail for {name}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4 mb-8">
            <div className="flex flex-col space-y-1.5" >
              <Label htmlFor="item_name">Items</Label>
              <Link to={`/items/${item_uid}`}>
                <Input className={"cursor-pointer"}  readOnly id="item_name"  type="text" value={data.items_model.item_name}/>
              </Link>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" min={0} placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="unite_price">Unite Price</Label>
              <Input id="unite_price" type="number" step="0.01" min={0} placeholder="0.00" value={unite_price} onChange={(e) => setUnite_price(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5 w-full max-w-full overflow-hidden">
              <Label htmlFor="note">Note</Label>
              <Textarea  wrap="soft" id="note" value={note} onChange={e=> setNote(e.target.value)}/>
            </div>
          </div>

          <div  className="flex flex-col gap-4">
            <Button className={"cursor-pointer py-5"} type="submit">Update</Button>
            <DeletePurchaseItemButton name={data.items_model.item_name} uid={data.uid} p_uid={data.purchas_uid}/>
            <Button className={"hover:bg-white cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1  ring-offset-2 hover:text-rose-700 hover:border-rose-700"} variant="outline" type="button" onClick={handleCancel}>Cancel</Button>
          </div>

          <div className="pt-4">
            {
              mutation.isError && (
                <ErrorComponents error={mutation.error}  className="mt-4" />
              )
            }
          </div>

        </form>

      </CardContent>

    </Card>
  )
}

export default UpdatePurhcaseDetailCard


