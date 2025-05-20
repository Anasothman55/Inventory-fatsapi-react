
import {   
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow, } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';


function phoneFormat(num){

  const part1 = num.slice(0, 4);    // first 4 letters
  const part2 = num.slice(4, 7);    // next 3 letters
  const part3 = num.slice(7, 11);   // last 4 letters
  
  const result = `${part1}-${part2}-${part3}`;
  return result;
}

const TableBodyItems = ({sortedData,types}) => {
  const nav = useNavigate()

  const handleRowClick = (id) => {
    nav(`/category/${id}`);
  };
  const handleItemRowClick = (id) => {
    nav(`/items/${id}`);
  };
  const handleTransactionsRowClick = (id) => {
    nav(`/employees/${id}`);
  };
  const handlePurchaseRowClick = (id) => {
    nav(`/purchase/${id}`);
  };
  const handlePurchaseItemRowClick = (id,pi_id) => {
    nav(`/purchase/${id}/purchase-info/${pi_id}`);
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  const formatTime= (time)=>{
    const [hours, minutes, secondsWithMs] = time.split(':');
    const seconds = secondsWithMs.split('.')[0];
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <TableBody>
      {
        types === 'categoryItems' ? (
          sortedData.map((c,index)=>(
            <TableRow onClick={()=>handleItemRowClick (c.uid)} key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.item_name}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.unit}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.stock}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.minimum_stock_level}</TableCell>
            </TableRow>
          ))
        )
        : types === 'category' ? (
          sortedData.map((c,index)=>(
            <TableRow onClick={()=> handleRowClick(c.uid)} key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.name}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.user_model.username}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{formatDate(c.created_at)}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{formatDate(c.updated_at)}</TableCell>
            </TableRow>
          ))
        )
        : types==="items" ?(
          sortedData.map((c,index)=>(
            <TableRow onClick={()=> handleItemRowClick(c.uid)} key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.item_name}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.stock}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.unit}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.minimum_stock_level}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{(c.description).slice(0,25) || ""}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{formatDate(c.created_at)}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{formatDate(c.updated_at)}</TableCell>
            </TableRow>
          ))
        )
        : types === "itemsTransactions" ? (
          sortedData.map((c,index)=>(
            <TableRow onClick={()=> handleTransactionsRowClick(c.employee_model.uid)} key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.employee_model.name}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.quantity}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.action_type}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.transaction_date}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{formatTime(c.transaction_time)}</TableCell>
            </TableRow>
          ))
        )
        : types === "itemsPurchase" ? (
          sortedData.map((c,index)=>(
            <TableRow onClick={()=> handlePurchaseRowClick(c.purchas_uid)} key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.quantity}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.unite_price}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.subtotal_price}</TableCell>
            </TableRow>
          ))
        )
        : types === "employee" ? (
          sortedData.map((c,index)=>(
            <TableRow onClick={()=> handleTransactionsRowClick(c.uid)} key={index} className={`transition-colors ${c?.employee_info_model?.fired_date ? 'bg-red-300 text-white hover:bg-red-600' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 ">{c.name}</TableCell>
              <TableCell className="px-4 py-2 ">{c.employee_info_model?.phone_number}</TableCell>
              <TableCell className="px-4 py-2">{c.employee_info_model?.job_title}</TableCell>
              <TableCell className="px-4 py-2">{c.employee_info_model?.address}</TableCell>
              <TableCell className="px-4 py-2 ">{c.employee_info_model?.hire_date}</TableCell>
            </TableRow>
          ))
        ) 
        : types === "employeeTransactions" ? (
          sortedData.map((c, index) =>(
            <TableRow onClick={()=> handleItemRowClick(c.items_model.uid)} key={index} className={`hover:bg-gray-50 transition-colors `}>
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.items_model.item_name}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.items_model.unit}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.items_model?.stock}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.quantity}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.action_type}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.transaction_date}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{formatTime(c.transaction_time)}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.note}</TableCell>
            </TableRow>
          ))
        )
        : types === "purchases" ?(
          sortedData.map((c, index) =>(
            <TableRow onClick={()=> handlePurchaseRowClick(c.uid)} key={index} className={`hover:bg-gray-50 transition-colors `}>
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.purchasing_plase}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.receipt_number}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.purchaser}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.curuncy_type}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.total_price}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.recipient}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.purchase_date}</TableCell>
            </TableRow>
          ))
        )
        : types === "purchaseItems" ?(
          sortedData.map((c, index) =>(
            
            <TableRow onClick={()=> handlePurchaseItemRowClick(c.purchas_uid,c.uid)} key={index} className={`hover:bg-gray-50 transition-colors `}>
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.items_model.item_name}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.quantity}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.items_model.stock}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.unite_price}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.subtotal_price}</TableCell>
            </TableRow>
          ))
        )
        : "null"
      }

    </TableBody>
  )
}

export default TableBodyItems
