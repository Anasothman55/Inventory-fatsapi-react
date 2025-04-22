
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

const TableBodyItems = ({sortedData,types}) => {

  const nav = useNavigate()

  const handleRowClick = (id) => {
    nav(`/category/${id}`);
  };
  const handleItemRowClick = (id) => {
    nav(`/items/${id}`);
  };
  const handleTransactionsRowClick = (id) => {
    nav(`/employee/${id}`);
  };
  const handlePurchaseRowClick = (id) => {
    nav(`/purchase/${id}`);
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
      {sortedData.map((c, index) => {

        if(types === 'categoryItems'){
          return (
            <TableRow onClick={()=>handleItemRowClick (c.uid)} key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.item_name}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.unit}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.stock}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.minimum_stock_level}</TableCell>
            </TableRow>
          );
        }

        if(types === 'category'){
          return (
            <TableRow onClick={()=> handleRowClick(c.uid)} key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.name}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.user_model.username}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{formatDate(c.created_at)}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{formatDate(c.updated_at)}</TableCell>
            </TableRow>
          );
        }

        if(types==="items"){
          return (
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
          );
        }

        if(types === "itemsTransactions"){
          return (
            <TableRow onClick={()=> handleTransactionsRowClick(c.employee_model.uid)} key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.employee_model.name}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.quantity}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.action_type}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.transaction_date}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{formatTime(c.transaction_time)}</TableCell>
            </TableRow>
          );
        }

        if(types === "itemsPurchase"){
          return (
            <TableRow onClick={()=> handlePurchaseRowClick(c.purchas_uid)} key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="px-4 py-2 ">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.quantity}</TableCell>
              <TableCell className="px-4 py-2 text-gray-700">{c.unite_price}</TableCell>
              <TableCell className="px-4 py-2 text-gray-600">{c.subtotal_price}</TableCell>
            </TableRow>
          );
        }
      })}
    </TableBody>
  )
}

export default TableBodyItems
