
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"

import DatePicker from "@/container/DatePicker"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import TimePicker from "@/container/TimePicker"
import { useUpdateTransaction } from "@/hook/transaction"
import ChoseItemCombo from "@/container/ChoseItemCombo"
import { Input } from "@/components/ui/input"
import ActionSelector from "@/container/ActionSelector"
import ChoseEmployeeCombo from "@/container/ChoseEmployeeCombo"
import DeletePurchaseItemButton from "../purchases/DeletePurchaseItemButton"
import ErrorComponents from "../../ErrorComponents"
import DeleteTransactionButton from "./DeleteTransactionButton"

const UpdateTransactionCrad = ({data}) => {
  const [quantity, setQuantity] = useState(data.quantity)
  const [transaction_date, setTransactionDate] = useState(new Date(data.transaction_date))
  const [transaction_time, setTransactionTime] = useState(() => {
    const dateTimeString = `${data.transaction_date}T${data.transaction_time}`
    const time = new Date(dateTimeString)
    return isNaN(time.getTime()) ? new Date().getTime() : time
  })
  const [note, setNote] = useState(data.note)


  const nav = useNavigate()


  const mutation = useUpdateTransaction(data.uid)
  const handleSubmit = (e) => {
    e.preventDefault()
    const formattedTransactionDate = transaction_date.toISOString().split("T")[0]
    const formattedTransactionTime = transaction_time.toTimeString().split(" ")[0].slice(0,5)
    
    mutation.mutate({
      quantity,
      transaction_date:formattedTransactionDate,
      transaction_time:formattedTransactionTime,
      note})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      setQuantity(data.quantity)
      setTransactionDate(new Date(data.transaction_date))
      setTransactionTime( new Date(data.transaction_time))
      setNote(data.note)

      toast.success("Transaction updated succsessfully")
      nav(`/transaction`)
    }

  },[mutation.isSuccess,data])


  const handleCancel = () =>{
    nav(`/transaction`) 
  }

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-[30px]">{"Update Transaction" }</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent className="">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2 justify-star">
              <Label htmlFor="item_name" className="text-right">Items</Label>
              <Link to={`/items/${data.items_model.uid}`} className="cursor-pointer">
                <Input type="text" id="item_name" value={data?.items_model.item_name} disabled  className="col-span-3" />
              </Link>
            </div>
            <div className="flex flex-col gap-2 justify-star">
              <Label htmlFor="employee_name" className="text-right">Employees</Label>
              <Link to={`/employees/${data?.employee_model.uid}`} className="cursor-pointer">
                <Input type="text" id="employee_name" value={data.employee_model.name} disabled className="col-span-3" />
              </Link>
            </div>
            <div  className="flex flex-col gap-2 justify-star">
              <Label  htmlFor="Actions Type" className="text-right">Actions Type</Label>
              <Input type="text" id="Actions Type" value={data.action_type} disabled className="col-span-3" />
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="quantity" className="text-right">Quantity</Label>
              <Input min={0} type="number" id="quantity" value={quantity} placeholder="0" onChange={(e) => setQuantity(e.target.value)}   className="col-span-3" />
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="Transaction Date" className="text-right">Transaction Date</Label>
              <DatePicker new_date={transaction_date} setDate={setTransactionDate}/>
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <Label htmlFor="Transaction Time" className="text-right">Transaction Time</Label>
              <TimePicker time={transaction_time} setTime={setTransactionTime}/>
            </div>
            <div className="flex flex-col gap-2 justify-start overflow-x-hidden">
              <Label htmlFor="note" className="text-right">Note</Label>
              <Textarea  wrap="soft" id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type your note here." />
            </div>
          </div>

          <div  className="flex flex-col gap-4">
            <Button className={"cursor-pointer py-5"} type="submit">Update</Button>
            <DeleteTransactionButton uid={data.uid}/>
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

export default UpdateTransactionCrad
