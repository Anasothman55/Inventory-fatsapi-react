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

import {  ItemMutateContainer } from "@/container"

import { useSetItems } from "@/hook/itemsHook"
import { InlineIcon } from "@iconify/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const CreateItemButton = () => {
  
  const [item_name, setItemName] = useState("")
  const [stock, setStock] = useState(0)
  const [unit, setUnit] = useState("")
  const [minimum_stock_level, setMinimumStockLevel] = useState(0)
  const [description, setDescription] = useState("")
  const [category_uid, setCategoryUid] = useState("")

  const [open, setOpen] = useState(false)


  const mutation = useSetItems()
  const handleSubmit = (e) => {
    e.preventDefault()
    const intStock = Number(stock)
    const minimumStockLevel = Number(minimum_stock_level)
    mutation.mutate({item_name, intStock, unit, minimumStockLevel, description,category_uid})
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

      toast.success("Item create succsessfully")
    }

  },[mutation.isSuccess,])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-emerald-700 hover:border-emerald-700"  variant="outline"> <span> <InlineIcon icon={"gala:add"}/></span> Add Items</Button>
      </DialogTrigger>
      <ItemMutateContainer
        title={"Create New Item"}
        des={"For creating item you just need to enter the name"}
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
        setCategoryUid={setCategoryUid}
      />
    </Dialog>
  )
}

export default CreateItemButton
