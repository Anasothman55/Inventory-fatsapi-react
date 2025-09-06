import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import {  ItemMutateContainer } from "@/container"

import { useSetItems } from "@/hook/itemsHook"
import { InlineIcon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const CreateItemButton = () => {
  
  const [item_name, setItemName] = useState("")
  const [stock, setStock] = useState(0)
  const [unit, setUnit] = useState("")
  const [minimum_stock_level, setMinimumStockLevel] = useState()
  const [description, setDescription] = useState("")
  const [category_uid, setCategoryUid] = useState("")

  const nav = useNavigate()

  const mutation = useSetItems()
  const handleSubmit = (e) => {
    e.preventDefault()
    const intStock = Number(stock)
    const minimumStockLevel = Number(minimum_stock_level)
    mutation.mutate({item_name, intStock, unit, minimumStockLevel, description,category_uid})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      setItemName("")
      setStock(0)
      setUnit("")
      setMinimumStockLevel(0)
      setDescription("")
      setCategoryUid("")

      toast.success("Item create succsessfully")
      nav(`/items`)
    }

  },[mutation.isSuccess,])

  return (

    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-[30px]">Add new Item</CardTitle>
        
        <CardDescription>for add new item you need fill all text box</CardDescription>
      </CardHeader>
      <ItemMutateContainer
        mutation={mutation}
        handleSubmit={handleSubmit}
        btn="Create"
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
        setCategoryUid={setCategoryUid}/>

    </Card>
  )
}

export default CreateItemButton
