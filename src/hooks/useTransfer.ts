// import { getTransfers as apiTranfers } from '../api/TransferAPI';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useTranferStore } from '../context/store';
import api from '../lib/axios';
import { GetTransfersSchema, ServerResponse, Transfer, TransferForm } from '../types';

export const useTransfer = () => {
   const { transfers, getTransfers, deleteTransfer, updateTransfer } = useTranferStore(
      (state) => state,
   );

   const gettingTransfers = async () => {
      try {
         const { data } = await api.get('/transfer');
         const response = GetTransfersSchema.safeParse(data);
         if (response.success) {
            getTransfers(response.data);
         }
      } catch (error) {
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
         }
      }
   };

   const deletingTransfer = async (id: Transfer['_id']) => {
      try {
         const { data } = await api.delete<ServerResponse>(`/transfer/${id}`);
         deleteTransfer(id);

         if (data.ok) {
            toast.success(data.msg);
         }
      } catch (error) {
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
         }
      }
   };

   const creatingTransfer = async (data: TransferForm) => {
      try {
         const { data: response } = await api.post<ServerResponse>('/transfer', data);
         console.log(response);
         if (response.ok) {
            toast.success(response.msg);
         }
      } catch (error) {
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
         }
      }
   };

   const gettingTransferById = async (id: Transfer['_id']) => {
      try {
         const { data } = await api.get<Transfer>(`/transfer/${id}`);
         // setActiveTransfer(data);
         return data;
      } catch (error) {
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
         }
      }
   };

   const updatingTransfer = async (id: Transfer['_id'], data: TransferForm) => {
      try {
         const { data: response } = await api.put<ServerResponse>(`/transfer/${id}`, data);
         if (response.ok) {
            updateTransfer({ ...data, _id: id });
            toast.success(response.msg);
         }
      } catch (error) {
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
         }
      }
   };

   return {
      //*Properties
      transfers,
      //*Methods
      gettingTransfers,
      deletingTransfer,
      creatingTransfer,
      gettingTransferById,
      updatingTransfer,
   };
};
