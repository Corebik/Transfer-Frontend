import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
//*TYPES
import { Transfer } from '../types';

type TransferState = {
   transfers: Transfer[];
   passOk: string;
   getTransfers: (data: Transfer[]) => void;
   deleteTransfer: (id: Transfer['_id']) => void;
   updateTransfer: (data: Transfer) => void;
   setPassOk: (data: string) => void;
   // addTransfer: (data: TransferForm) => void;
   // deleteTransfer: (id: Transfer['id']) => void;
   // getTransferById: (id: Transfer['id']) => void;
   // updateTransfer: (data: TransferForm) => void;
};

export const useTranferStore = create<TransferState>()(
   devtools(
      persist(
         (set) => ({
            transfers: [],
            passOk: '',
            getTransfers: (data: Transfer[]) => {
               set(() => ({
                  transfers: data,
                  activeTransfer: null,
               }));
            },
            deleteTransfer: (id: Transfer['_id']) => {
               set((state) => ({
                  transfers: state.transfers.filter((transfer) => transfer._id !== id),
                  activeTransfer: null,
               }));
            },
            updateTransfer: (data: Transfer) => {
               set((state) => ({
                  transfers: state.transfers.map((transfer) =>
                     transfer._id === data._id ? data : transfer,
                  ),
                  activeTransfer: null,
               }));
            },
            setPassOk: (data: string) => {
               set(() => ({
                  passOk: data,
               }));
            },
         }),
         {
            name: 'transfers-storage',
         },
      ),
   ),
);
