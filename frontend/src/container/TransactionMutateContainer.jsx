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
import DatePicker from "./DatePicker"
import CurruncySelector from "./CurruncySelector"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChoseItemCombo from "./ChoseItemCombo"
import ActionSelector from "./ActionSelector"
import TimePicker from "./TimePicker"
import ChoseEmployeeCombo from "./ChoseEmployeeCombo"



const TransactionMutateContainer = ({title,des,mutation,handleSubmit,btn, ...props}) => {
  return (  
    <DialogContent className="sm:max-w-[475px] h-[80vh]">
      <DialogHeader> 
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{des}</DialogDescription>
      </DialogHeader>
      <ScrollArea className={"h-[100%] pr-4 overflow-auto"}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2 justify-star">
              <Label htmlFor="item_uid" className="text-right">Items</Label>
              <ChoseItemCombo value={props.item_uid} onChange={props.setItemUid} />
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="quantity" className="text-right">Quantity</Label>
              <Input min={0} type="number" id="quantity" value={props.quantity} placeholder="0" onChange={(e) => props.setQuantity(e.target.value)}   className="col-span-3" />
            </div>
            <div  className="flex flex-col gap-2 justify-star">
              <Label  htmlFor="Actions Type" className="text-right">Actions Type</Label>
              <ActionSelector value={props.action_type} setOnChange={props.setActionType} />
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="Transaction Date" className="text-right">Transaction Date</Label>
              <DatePicker new_date={props.transaction_date} setDate={props.setTransactionDate}/>
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="Transaction Time" className="text-right">Transaction Time</Label>
              <TimePicker time={props.transaction_time} setTime={props.setTransactionTime}/>
            </div>
            <div className="flex flex-col gap-2 justify-star">
              <Label htmlFor="employee_uid" className="text-right">Employees</Label>
              <ChoseEmployeeCombo value={props.employee_uid} onChange={props.setEmployeeUid} />
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
    </DialogContent>
  )
}


export default TransactionMutateContainer
