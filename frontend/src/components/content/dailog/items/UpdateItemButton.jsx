
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

import {  useUpdateItems } from "@/hook/itemsHook"
import { InlineIcon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"



const UpdateItemButton = ({data}) => {
  const [item_name, setItemName] = useState(data?.item_name)
  const [stock, setStock] = useState(data?.stock)
  const [unit, setUnit] = useState(data?.unit)
  const [minimum_stock_level, setMinimumStockLevel] = useState(data?.minimum_stock_level)
  const [description, setDescription] = useState(data?.description)
  const [category_uid, setCategoryUid] = useState(data?.category_uid || "")

  const nav = useNavigate()
   
  const mutation = useUpdateItems(data?.uid)
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({item_name, stock, unit, minimum_stock_level, description,category_uid})
  }

  useEffect(()=>{
    if(mutation.isSuccess){

      toast.success("Item update succsessfully")
      nav(`/items/${data?.uid}`)
    }

  },[mutation.isSuccess,])

  return (

    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-[30px]">Update {item_name}</CardTitle>
        
        <CardDescription>for updating item replace the old value with new one</CardDescription>
      </CardHeader>
      <ItemMutateContainer
        mutation={mutation}
        handleSubmit={handleSubmit}
        btn="Update"
        item_name={item_name}
        setItemName={setItemName}
        stock={stock}
        setStock={setStock}
        unit={unit}
        setUnit={setUnit}
        minimum_stock_level={minimum_stock_level}
        setMinimumStockLevel={setMinimumStockLevel}
        description={description}
        setDescription={setDescription}
        category_uid={category_uid}
        setCategoryUid={setCategoryUid}
      />

    </Card>
  )
}

export default UpdateItemButton
