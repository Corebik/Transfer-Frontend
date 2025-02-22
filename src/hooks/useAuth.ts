// import { getTransfers as apiTranfers } from '../api/TransferAPI';
import { toast } from 'react-toastify';
import { useTranferStore } from '../context/store';
import api from '../lib/axios';
import { ServerLoginResponse, ServerResponse, UserLoginForm, UserRegisterForm } from '../types';

export const useAuth = () => {
   const { passOk, setPassOk } = useTranferStore((state) => state);

   const startLogin = async (credentials: UserLoginForm) => {
      try {
         const { data } = await api.post<ServerLoginResponse>('/auth/login', credentials);
         localStorage.setItem('token', data.token);
         toast.success('Welcome!');
      } catch (error) {
         toast.error('Credenciales incorrectas');
      }
   };

   const startRegister = async (credentials: UserRegisterForm) => {
      try {
         const { data } = await api.post<ServerResponse>('/auth/create-user', credentials);
         console.log(data);
         if (data.ok) {
            toast.success(data.msg);
         }
      } catch (error) {
         toast.error('Error al crear el usuario');
      }
   };

   const startGerUser = async () => {
      try {
         setPassOk('cargando...');
         const { data } = await api.get('/auth/user');
         setPassOk('Valido');
         return data;
      } catch (error) {
         console.log(error);
         setPassOk('Invalido');
      }
   };

   return {
      passOk,
      startLogin,
      startRegister,
      startGerUser,
   };
};
