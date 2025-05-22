
import {  CreateItemButton, ErrorComponents, TableComponents } from '../../components/content';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import CreatePurchaseButton from '@/components/content/dailog/purchases/CreatePurchaseButton';
import { useTransactionsData } from '@/hook/transaction';
import DateRange from '@/container/DateRange';
import DatePicker from '@/container/DatePicker';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'react-router-dom';
import { parse, isValid, isAfter, format } from "date-fns";
import CreateTransactionDailog from '@/components/content/dailog/transactions/CreateTransactionDailog';

const header = [
  { name: "index", placeholder: "#" },
  { name: "employee_model.name", placeholder: "Employee" },
  { name: "items_model.item_name", placeholder: "Item" },
  { name: "items_model.unit", placeholder: "Unit" },
  { name: "quantity", placeholder: "Queantity" },
  { name: "action_type", placeholder: "Actions Type" },
  { name: "transaction_date", placeholder: "Date" },
  { name: "transaction_time", placeholder: "Time" },
]

function validateAndFixDates(fromStr, toStr) {
  const today = new Date();
  const defaultDateStr = format(today, "yyyy-MM-dd");

  const fromDate = fromStr ? parse(fromStr, "yyyy-MM-dd", new Date()) : null;
  const toDate = toStr ? parse(toStr, "yyyy-MM-dd", new Date()) : null;

  // If either is invalid or missing, reset both to today
  if (!fromDate || !toDate || !isValid(fromDate) || !isValid(toDate)) {
    return { from: defaultDateStr, to: defaultDateStr };
  }

  // If from > to, fix by making to = from
  if (isAfter(fromDate, toDate)) {
    return { from: fromStr, to: fromStr };
  }

  // If from or to is in the future, reset both to today
  if (isAfter(fromDate, today) || isAfter(toDate, today)) {
    return { from: defaultDateStr, to: defaultDateStr };
  }

  return { from: fromStr, to: toStr };
}


const MainTransactionPage = () => {
  const [searchBox, setSearchBox] = useState('')
  const today = new Date().toISOString().split("T")[0];
  const [searchParams, setSearchParams] = useSearchParams();

  const from = searchParams.get('from');
  const to = searchParams.get('to');


  const [dateRange, setDateRange] = useState({
    from: from || today,
    to: to || today
  });

  useEffect(() => {
    const fixedDates = validateAndFixDates(from, to);

    // Only set if validation actually fixes something
    if (fixedDates.from !== from || fixedDates.to !== to) {
      setSearchParams(fixedDates, { replace: true });
    } else if (!from || !to) {
      // If they are null (first load), still set to today
      setSearchParams({ from: dateRange.from, to: dateRange.to }, { replace: true });
    }
  }, []); // Only run on mount

  useEffect(() => {
    if (from && to && (from !== dateRange.from || to !== dateRange.to)) {
      setDateRange({ from, to });
    }
  }, [from, to]);

  useEffect(() => {
    // Avoid updating searchParams if already in sync
    if (dateRange.from !== from || dateRange.to !== to) {
      setSearchParams({ from: dateRange.from, to: dateRange.to }, { replace: true });
    }
  }, [dateRange]);


  const {data, isLoading, error, isError } = useTransactionsData({
    start: dateRange.from,
    end: dateRange.to,
  })

  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>{
      <ErrorComponents error={error} />
    }</div>
  }

  const filteredData = data?.filter((transaction) =>
    transaction.employee_model.name.toLowerCase().includes(searchBox.toLowerCase()) || 
    transaction.items_model.item_name.toLowerCase().includes(searchBox.toLowerCase()) ||
    transaction.items_model.unit.toLowerCase().includes(searchBox.toLowerCase())    ||
    transaction.action_type.toLowerCase().includes(searchBox.toLowerCase())
  );


  return (  
    <div  className='h-full flex flex-col '>
      <h3 className='text-[14px]'>Transaction / All Transaction</h3>
      
      <h1 className='font-bold text-[32px] mt-5'>All Transaction</h1>
      
      <div className='flex justify-between max-md:flex-col mt-10  gap-5'>
        <CreateTransactionDailog/>
        <div className='flex items-center gap-5 flex-wrap justify-between'>
          <DateRange new_date_range={dateRange} setDateRange={setDateRange} />
          <Input value={searchBox} onChange={(e)=> setSearchBox(e.target.value)}    className="w-80 py-5 border border-gray-300 focus:ring-1 focus:ring-gray-300 ring-offset-2 transition-all duration-300 ease-in max-md:w-full "  type="text" placeholder="Search"/>
        </div>
      </div>

      {/* Render fetched category data here */}
      {
        !isLoading && (
          data.length > 0 ? (
            <div className="mt-6 flex-grow min-h-[90vh] pb-4">
              <ScrollArea className="h-full w-full rounded-sm shadow-sm overflow-auto">
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[800px]">
                    <TableComponents data={filteredData} header={header} types={"main_transaction"}/>
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          )
          : <h1 className='h-full grid place-items-center my-5 text-[30px]'>There are no Transaction</h1>
        )
      }
    </div>
  )
}

export default MainTransactionPage
