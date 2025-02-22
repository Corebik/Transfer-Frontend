import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';
import { tableHeaders } from "../data";
import { handleHuella } from "../helpers/carbono";
import { useTransfer } from "../hooks/useTransfer";
import { TableHeader } from "./TableHeader";
import { TransferRow } from "./TransferRow";

export const TransferList = () => {

   const [filterValue, setFilterValue] = useState("");
   const [filterField, setFilterField] = useState("worker");

   const { transfers } = useTransfer();

   const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
      setFilterValue(event.target.value.toLowerCase());
   }

   const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setFilterField(event.target.value);
   }

   const filteredTransfers = transfers.filter(transfer => {
      const fieldValue = transfer[filterField as keyof typeof transfer];
      if (typeof fieldValue === 'string') {
         return fieldValue.toLowerCase().includes(filterValue);
      }
      return false;
   });

   const totalHuellaCarbono = filteredTransfers.reduce((acc, transfer) => acc + handleHuella(transfer.kilometers, transfer.transport), 0);

   const handleExcelDownload = () => {

      const woorkbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(filteredTransfers);
      XLSX.utils.book_append_sheet(woorkbook, worksheet, 'Transfers');
      XLSX.writeFile(woorkbook, 'transfers.xlsx');

   }

   return (
      <>
         <div className="container mx-auto px-4 sm:px-8 max-w-[90%]">
            <div className="py-8">
               <div>
                  <h2 className="text-2xl font-semibold leading-tight">Filtro</h2>
               </div>
               <div className="my-2 flex sm:flex-row flex-col relative">
                  <div className="flex flex-row mb-1 sm:mb-0">
                     <div className="relative">
                        <select
                           onChange={handleSelectChange}
                           className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                           <option value="worker">Nombre</option>
                           <option value="startPoint">Punto de partida</option>
                           <option value="endPoint">Punto de término</option>
                        </select>
                        <div
                           className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                           </svg>
                        </div>
                     </div>
                  </div>
                  <div className="block relative">
                     <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                           <path
                              d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                           </path>
                        </svg>
                     </span>
                     <input type="text" onChange={handleFilter} placeholder="Search"
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                  </div>
                  <div className="absolute right-0">
                     <Link to="/new-transfer"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-400 ease-in-out">
                        Agregar Traslado
                     </Link>
                  </div>
               </div>
               <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                     <table id="transfersTable"
                        className="min-w-full leading-normal">
                        <thead>
                           <tr>
                              {tableHeaders.map(header => (
                                 <TableHeader key={header}>{header}</TableHeader>
                              ))}
                           </tr>
                        </thead>
                        <tbody>
                           {filteredTransfers.map(transfer => (
                              <TransferRow key={transfer._id} {...transfer} />
                           ))}
                        </tbody>
                     </table>
                     <div className="relative px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                        <h3 className=" text-left text-xs md:text-[16px] 
                        font-semibold text-gray-600 uppercase
                        ">Huella de Carbono de la empresa: {''}
                           <span
                              className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span aria-hidden
                                 className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                              <span className="relative">{totalHuellaCarbono.toFixed(3)}</span>
                           </span>
                        </h3>

                        <div className="absolute right-[10px] top-[5px]">
                           <button onClick={handleExcelDownload}
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-400 ease-in-out">
                              Exportar Excel
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}