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
import CurruncySelector from "./CurruncySelector"
import { ScrollArea } from "@/components/ui/scroll-area"
import DatePicker from "@/container/DatePicker"
import { CardContent } from "@/components/ui/card"







const PurchaseMutateContainer = ({mutation,handleSubmit,btn, ...props}) => {
  return (  
    <CardContent>
      <ScrollArea className={"h-[100%] pr-4 overflow-auto"}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2 justify-star">
              <Label htmlFor="name" className="text-right">Purchase Plase</Label>
              <Input id="name" value={props.purchasing_plase} onChange={(e) => props.setPurchasing_plase(e.target.value)}  placeholder="پێنجوێن"  className="col-span-3" />
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="total_price" className="text-right">Recipient Number</Label>
              <Input type="number" id="total_price" value={props.receipt_number} placeholder="3458" onChange={(e) => props.setReceipt_number(e.target.value)}   className="col-span-3" />
            </div>
            <div  className="flex flex-col gap-2 justify-star">
              <Label  htmlFor="Purchaser" className="text-right">Purchaser</Label>
              <Input type="text" min={0} id="Purchaser" value={props.purchaser} placeholder="ڕێکار" onChange={(e) => props.setPurchaser(e.target.value)}   className="col-span-3" />
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="Beneficiary" className="text-right">Beneficiary</Label>
              <Input id="Beneficiary" value={props.beneficiary} onChange={(e) => props.setBeneficiary(e.target.value)} placeholder="ڕێبەر"  className="col-span-3" />
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="CuruncyType" className="text-right">Curuncy Type</Label>
              <CurruncySelector value={props.curuncy_type} setOnChange={props.setCuruncy_type}/>
            </div>

            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="total_price" className="text-right">Total Price</Label>
              <Input type="number" id="total_price" value={props.total_price} onChange={(e) => props.setTotal_price(e.target.value)}   className="col-span-3" />
            </div>

            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="total_price" className="text-right">Recipient</Label>
              <Input type="text" id="total_price" value={props.recipient} placeholder="عادل" onChange={(e) => props.setRecipient(e.target.value)}   className="col-span-3" />
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="date_of_birth">Purchase Date</Label>
              <DatePicker new_date={props.purchase_date} setDate={props.setPurchase_date}/>
            </div>
            <div className="flex flex-col gap-2 justify-start overflow-x-hidden">
              <Label htmlFor="note" className="text-right">Note</Label>
              <Textarea  wrap="soft" id="note" value={props.note} onChange={(e) => props.setNote(e.target.value)} placeholder="Type your note here." />
            </div>
          </div>

          <DialogFooter className="flex sm:flex-col mt-7">
            <Button type="submit">{btn}</Button>
            <div>
              {
                mutation.error && (<p>
                  <ErrorComponents error={mutation.error} act={true}/>
                </p>)
              }
            </div>
          </DialogFooter>
        </form>
      </ScrollArea>
    </CardContent>
  )
}

export default PurchaseMutateContainer
