import React, { useEffect, useState } from "react";

import {   
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow, } from '@/components/ui/table';
import { TableBodyItems } from "@/container";





const TableComponents = ({ data, header , types}) => {

  const [sortConfig, setSortConfig] = useState({
    key: "", 
    direction: "ascending",
  });

  const handleSort = (column) => {
    let direction = "ascending";
    if (sortConfig.key === column && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({
      key: column,
      direction: direction,
    });
  };

  const getValueByPath = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  const normalize = (val) => {
    if (typeof val === 'string' && !isNaN(val)) {
      return parseFloat(val); // convert currency-like strings to numbers
    }
    return val;
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = normalize(getValueByPath(a, sortConfig.key));
    const bValue = normalize(getValueByPath(b, sortConfig.key));

    if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  return (
    <Table className="min-w-[800px]  table-auto bg-white ">
      <TableHeader className={""}>
        <TableRow className="sticky top-0 z-10 bg-gray-200 text-left text-sm font-semibold text-gray-700">
          {
            header.map((c, index) => (
              <TableHead key={index} className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort(c.name)}
              >
                {c.placeholder}
                {sortConfig.key === c.name && (
                  <span>{sortConfig.direction === 'ascending' ? '↓' : '↑'}</span>
                )}
              </TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBodyItems sortedData={sortedData} types={types}/>
    </Table>
  );
};

export default TableComponents;
