

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
import TransactionMutateContainer from "@/container/TransactionMutateContainer"

import { useSetTransaction } from "@/hook/transaction"
import { InlineIcon } from "@iconify/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"


const CreateTransactionDailog = () => {
  const [item_uid, setItemUid] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [action_type, setActionType] = useState("") 
  const [transaction_date, setTransactionDate] = useState(new Date())
  const [transaction_time, setTransactionTime] = useState(new Date())
  const [employee_uid , setEmployeeUid ] = useState("")
  const [note, setNote] = useState("")

  const [open, setOpen] = useState(false)


  const mutation = useSetTransaction()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formattedTransactionDate = transaction_date.toISOString().split("T")[0]
    const formattedTransactionTime = transaction_time.toTimeString().split(" ")[0].slice(0,5)

    mutation.mutate({
      item_uid,quantity,action_type,
      transaction_date:formattedTransactionDate,
      transaction_time:formattedTransactionTime,
      employee_uid,note})
  }

  useEffect(()=>{
    if(mutation.isSuccess){
      setOpen(false)
      setItemUid("")
      setQuantity(0)
      setActionType("")
      setTransactionDate(new Date())
      setTransactionTime(new Date())
      setEmployeeUid("")
      setNote("")

      toast.success("Transaction create succsessfully")
    }

  },[mutation.isSuccess,])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer  py-5 border-1 border-gray-300 foucus:ring-1 focus:ring-gray-300 ring-offset-2 hover:text-emerald-700 hover:border-emerald-700"  variant="outline"> <span> <InlineIcon icon={"gala:add"}/></span> Add Transaction</Button>
      </DialogTrigger>
      <TransactionMutateContainer
        title={"Create New Transaction"}
        des={"For creating transaction you need to fill this form"}
        mutation={mutation}
        handleSubmit={handleSubmit}
        btn="Create"
        item_uid={item_uid}
        setItemUid={setItemUid}
        quantity={quantity}
        setQuantity={setQuantity}
        action_type={action_type}
        setActionType={setActionType}
        transaction_date={transaction_date}
        setTransactionDate={setTransactionDate}
        transaction_time={transaction_time}
        setTransactionTime={setTransactionTime}
        employee_uid={employee_uid}
        setEmployeeUid={setEmployeeUid}
        note={note}
        setNote={setNote}
      />
    </Dialog>
  )
}

export default CreateTransactionDailog
