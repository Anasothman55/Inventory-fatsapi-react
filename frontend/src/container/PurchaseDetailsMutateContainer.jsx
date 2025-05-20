import { Button } from "@/components/ui/button"
import {
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import DatePicker from "@/container/DatePicker"
import { Textarea } from "@/components/ui/textarea"
import { ErrorComponents } from "@/components/content"
import DeleteEmployeeButton from "@/components/content/dailog/employee/DeleteEmployeeButton"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import ChoseItemCombo from "./ChoseItemCombo"
import ChoseCategoryCombo from "./ChoseCategoryCombo"

const PurchaseDetailsMutateContainer = ({handleSubmit,handleCancel,mutation, btn, ...props}) => {
  const [check, setCheck] = useState(false);

  return (
    <CardContent className="">
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4 mb-8">
          {
            !check && <div className="flex flex-col space-y-1.5" >
              <Label htmlFor="item_name">Items</Label>
              <ChoseItemCombo  id="item_name" name="item_name"  value={props.item_uid} onChange={props.setItem_uid}/>
            </div>
          }
          <div className="flex items-center gap-3 space-y-1.5">
            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">OR new item</label>
            <Checkbox id="terms" checked={check} onCheckedChange={setCheck} />
          </div>
          {
            check && <>
              <div className="flex flex-col gap-2 justify-star">
                <Label htmlFor="name" className="text-right">Item Name</Label>
                <Input id="name" value={props.new_name} onChange={(e) => props.setNew_name(e.target.value)}  placeholder="بۆری"  className="col-span-3" />
              </div>
              <div className="flex flex-col gap-2 justify-start">
                <Label htmlFor="unit" className="text-right">Unit</Label>
                <Input id="unit" value={props.unit} onChange={(e) => props.setUnit(e.target.value)} placeholder="دانە"  className="col-span-3" />
              </div>
              <div className="flex flex-col gap-2 justify-start">
                <Label htmlFor="category" className="text-right">Category</Label>
                <ChoseCategoryCombo value={props.category_uid} onChange={props.setCategory_uid} />
              </div>
            </>
          }
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" min={0} placeholder="0" value={props.quantity} onChange={(e) => props.setQuantity(e.target.value)}/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="unite_price">Unite Price</Label>
            <Input id="unite_price" type="number" step="0.01" min={0} placeholder="0.00" value={props.unite_price} onChange={(e) => props.setUnite_price(e.target.value)}/>
          </div>
          <div className="flex flex-col space-y-1.5 w-full max-w-full overflow-hidden">
            <Label htmlFor="note">Note</Label>
            <Textarea  wrap="soft" id="note" value={props.note} onChange={e=> props.setNote(e.target.value)}/>
          </div>
        </div>

        <div  className="flex flex-col gap-4">
          <Button className={"cursor-pointer py-5"} type="submit">{btn}</Button>
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
  )
}
export default PurchaseDetailsMutateContainer
