import { handleHuella } from "../helpers/carbono";
import { getDateFormat } from "../helpers/getDate";
import { useTransfer } from "../hooks/useTransfer";
import { Transfer } from "../types";

import { Link } from "react-router-dom";

export const TransferRow = (transfer: Transfer) => {

   const { deletingTransfer } = useTransfer();

   return (
      <tr className="border-b border-gray-200 bg-white">
         <td className="px-5 py-5 text-sm">
            <div className="flex items-center">
               <div className="flex-shrink-0 w-10 h-10">
                  <img className="w-full h-full rounded-full"
                     src="user.png"
                     alt="" />
               </div>
               <div className="ml-3">
                  <p className="text-gray-900 whitespace-no-wrap">
                     {transfer.worker}
                  </p>
               </div>
            </div>
         </td>
         <td className="px-5 py-5 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{transfer.startPoint}</p>
         </td>
         <td className="px-5 py-5 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{transfer.endPoint}</p>
         </td>
         <td className="px-5 py-5 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{transfer.transport}</p>
         </td>
         <td className="px-5 py-5 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{transfer.kilometers}</p>
         </td>
         <td className="px-5 py-5 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
               {getDateFormat(transfer.date)}
            </p>
         </td>
         <td className="px-5 py-5 text-sm">
            <span
               className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
               <span aria-hidden
                  className={`absolute inset-0 opacity-50 rounded-full 
                  ${transfer.roundTrip ? 'bg-green-200' : 'bg-red-300'}`}></span>
               <span className="relative">{transfer.roundTrip ? 'Si' : 'No'}</span>
            </span>
         </td>
         <td className="px-5 py-5 text-sm">
            <span
               className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
               <span aria-hidden
                  className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
               <span className="relative">{handleHuella(transfer.kilometers, transfer.transport)}</span>
            </span>
         </td>
         <td className="px-2 pt-[26px] text-sm flex items-center gap-2 ">
            <Link
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in duration-200"
               to={`/${transfer._id}`}
            >
               Editar
            </Link>
            <button
               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition ease-in duration-200"
               onClick={() => deletingTransfer(transfer._id)}
            >
               Eliminar
            </button>
         </td>
      </tr>
   )
}
