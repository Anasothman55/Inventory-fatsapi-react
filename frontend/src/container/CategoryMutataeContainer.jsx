
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
import { InlineIcon } from "@iconify/react"



import React from 'react'

const CategoryMutataeContainer = ({title,description,mutation, handleSubmit,nameV,setNamEv,btn}) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>
        {
          mutation.error && (<DialogDescription>
              <ErrorComponents error={mutation.error}/>
          </DialogDescription>)

        }
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={nameV}
              onChange={(e) => setNamEv(e.target.value)}
              className="col-span-3"
              placeholder="e.g. Monitors"
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={mutation.isPending} type="submit">
            {mutation.isPending ? <InlineIcon icon="svg-spinners:90-ring-with-bg"/> : btn}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

export default CategoryMutataeContainer
