
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

import {  useUpdateItems } from "@/hook/itemsHook"
import { InlineIcon } from "@iconify/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"



const UpdateItemButton = ({data}) => {
  const [item_name, setItemName] = useState(data.item_name)
  const [stock, setStock] = useState(data.stock)
  const [unit, setUnit] = useState(data.unit)
  const [minimum_stock_level, setMinimumStockLevel] = useState(data.minimum_stock_level)
  const [description, setDescription] = useState(data.description)
  const [category_uid, setCategoryUid] = useState(data.category_uid || "")

  const [open, setOpen] = useState(false)


  const mutation = useUpdateItems(data.uid)
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({item_name, stock, unit, minimum_stock_level, description,category_uid})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      setOpen(false)
      setItemName("")
      setStock(0)
      setUnit("")
      setMinimumStockLevel(0)
      setDescription("")
      setCategoryUid("")

      toast.success("Item update succsessfully")
    }

  },[mutation.isSuccess,])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:bg-white  cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-yellow-500 hover:border-yellow-500 "   variant="outline"> <span> <InlineIcon icon={"radix-icons:update"}/> </span> Update Item</Button>
      </DialogTrigger>
      <ItemMutateContainer
        title={`Update ${data.item_name}`}
        des={"Update the item data"}
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
    </Dialog>
  )
}

export default UpdateItemButton
