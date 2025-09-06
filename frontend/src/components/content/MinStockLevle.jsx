"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "../ui/scroll-area"

const MinStockLevel = ({ datas }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b py-4 sm:py-5">
        <div className="space-y-1">
          <CardTitle>Minimum Stock Level Items</CardTitle>
          <CardDescription>
            Showing items that are below or near their minimum stock levels
          </CardDescription>
        </div>
      </CardHeader>

      {/* 🟢 CardContent with flexible layout */}
        <ScrollArea className="flex-1 overflow-y-auto max-h-[220px] min-[1920px]:max-h-[500px]">
        <CardContent className="flex flex-col flex-1 overflow-hidden px-4 pb-4 pt-2 sm:px-6">
          {/* 🟢 ScrollArea will grow and shrink properly */}
            <div className="min-w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>MSL</TableHead>
                    <TableHead>Current Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datas.map((item) => (
                    <TableRow key={item.uid}>
                      <TableCell>{item.item_name}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.minimum_stock_level}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
        </CardContent>
        </ScrollArea>
    </Card>
  )
}

export default MinStockLevel
