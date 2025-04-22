
import { ErrorComponents } from "@/components/content"
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
import { ChoseCategoryCombo } from "@/container"


const ItemMutateContainer = ({title,des,mutation,handleSubmit,btn, ...props}) => {
  return (
    <DialogContent className="sm:max-w-[475px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{des}</DialogDescription>
        {
          mutation.error && (<p>
              <ErrorComponents error={mutation.error} act={false}/>
          </p>)

        }
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2 justify-star">
            <Label htmlFor="name" className="text-right">Item Name</Label>
            <Input id="name" value={props.item_name} onChange={(e) => props.setItemName(e.target.value)}  placeholder="بۆری"  className="col-span-3" />
          </div>
          <div  className="flex flex-col gap-2 justify-star">
            <Label  htmlFor="stock" className="text-right">Stock Quantity</Label>
            <Input type="number" min={0} id="stock" value={props.stock} placeholder="0" onChange={(e) => props.setStock(e.target.value)}   className="col-span-3" />
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <Label htmlFor="unit" className="text-right">Unit</Label>
            <Input id="unit" value={props.unit} onChange={(e) => props.setUnit(e.target.value)} placeholder="دانە"  className="col-span-3" />
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <Label htmlFor="msl" className="text-right">MSL</Label>
            <Input type="number" min={0} id="msl" value={props.minimum_stock_level} onChange={(e) => props.setMinimumStockLevel(e.target.value)}   className="col-span-3" />
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <Label htmlFor="category" className="text-right">Category</Label>
            <ChoseCategoryCombo value={props.category_uid} onChange={props.setCategoryUid} />
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" value={props.description} onChange={(e) => props.setDescription(e.target.value)} placeholder="Type your message here." />
          </div>
        </div>

        {
          mutation.error && (
            <ul>
              {mutation.error.response?.data?.detail.map((error, index) => {
                let message = "";

                if (error.type === "string_type") {
                  message = error.loc[1] === "item_name" ? "Item Name is required" : "Unit is required";
                } else if (error.type === "uuid_parsing") {
                  message = "Please select a valid category";
                } else {
                  message = error.msg;
                }

                return (
                  <li key={index} className="text-red-500 text-sm">• {message}</li>
                );
              })}
            </ul>
          )
        }
        <DialogFooter>
          <Button type="submit">{btn}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

export default ItemMutateContainer
