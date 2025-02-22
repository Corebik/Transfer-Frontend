import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import { TransferList } from './components/TransferList';
import { useTransfer } from './hooks/useTransfer';

export const App = () => {

   const { transfers, gettingTransfers } = useTransfer();

   useEffect(() => {
      gettingTransfers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


   return (
      <>
         <div className="container mx-auto mt-12">
            <h1 className="font-black text-4xl text-center md:w-2/3 md:mx-auto">
               Traslados - {''} <span className="text-indigo-700">Trabajadores</span>
            </h1>
         </div>

         {
            transfers.length > 0
               ? <TransferList />
               : (<>
                  <p className="text-center text-2xl mt-10 font-bold">
                     No hay Traslados Registrados {''}
                     <a className="text-indigo-700">Crea uno</a>
                  </p>
               </>
               )
         }



         <ToastContainer />
      </>
   )
}
