

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
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


const CreateTransactionDailog = ({action_type}) => {
  const [item_uid, setItemUid] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [transaction_date, setTransactionDate] = useState(new Date())
  const [transaction_time, setTransactionTime] = useState(new Date())
  const [employee_uid , setEmployeeUid ] = useState("")
  const [note, setNote] = useState("")



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
      setItemUid("")
      setQuantity(0)
      setTransactionDate(new Date())
      setTransactionTime(new Date())
      setEmployeeUid("")
      setNote("")

      toast.success("Transaction create succsessfully")
    }

  },[mutation.isSuccess,])

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="text-[30px]">
          {action_type == 'intake' ? "In tak Item": "Out Take Item"}
        </CardTitle>
      </CardHeader>

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
        transaction_date={transaction_date}
        setTransactionDate={setTransactionDate}
        transaction_time={transaction_time}
        setTransactionTime={setTransactionTime}
        employee_uid={employee_uid}
        setEmployeeUid={setEmployeeUid}
        note={note}
        setNote={setNote}
      />
    </Card>
  )
}

export default CreateTransactionDailog
