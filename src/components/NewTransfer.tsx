import { useForm } from 'react-hook-form';
import { TransferForm } from '../types';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFormDate } from '../helpers/getDate';
import { useTransfer } from '../hooks/useTransfer';
import { Error } from './Error';

import { options } from '../data';

export const NewTransfer = () => {

   const { transferId } = useParams();
   const { creatingTransfer, gettingTransferById, updatingTransfer } = useTransfer();
   const navigate = useNavigate();

   const { register, handleSubmit, setValue, formState: { errors } } = useForm<TransferForm>({
      defaultValues: {
         startPoint: '',
         endPoint: '',
         transport: 'Metro (Tren, Subway, Subterráneo)',
         kilometers: 0,
         date: '',
         worker: '',
         roundTrip: false,
      },
   });

   useEffect(() => {
      if (transferId) {
         gettingTransferById(transferId).then(data => {
            if (data) {
               setValue('startPoint', data.startPoint);
               setValue('endPoint', data.endPoint);
               setValue('transport', data.transport);
               setValue('kilometers', data.kilometers);
               setValue('date', getFormDate(data.date));
               setValue('worker', data.worker);
               setValue('roundTrip', data.roundTrip);
            }
         })

      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [transferId]);

   const registerTransfer = (data: TransferForm) => {
      data.kilometers = +data.kilometers;
      if (typeof data.roundTrip === 'string') {
         data.roundTrip = data.roundTrip === 'true';
      }

      if (transferId) {
         updatingTransfer(transferId, data);
         navigate('/');
         return;
      }
      creatingTransfer(data);
      navigate('/');
   }

   return (
      <div className="w-1/2 mx-auto py-10">
         <h2 className="font-black text-3xl text-center">Traslado</h2>

         <p className="text-lg mt-2 text-center mb-10">
            <span className="text-indigo-600 font-bold">Registro de Traslados</span>
         </p>

         <form
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            noValidate
            onSubmit={handleSubmit(registerTransfer)}
         >
            <div className="mb-5">
               <label htmlFor="startPoint" className="text-sm uppercase font-bold">
                  Punto de Partida
               </label>

               <input
                  id="startPoint"
                  className="w-full p-3  border border-gray-100"
                  type="text"
                  {...register('startPoint', {
                     required: "El punto de partida es obligatorio",
                  })}
               />

               {errors.startPoint && <Error>{errors.startPoint?.message}</Error>}

            </div>

            <div className="mb-5">
               <label htmlFor="endPoint" className="text-sm uppercase font-bold">
                  Punto de Término
               </label>

               <input
                  id="endPoint"
                  className="w-full p-3  border border-gray-100"
                  type="text"
                  {...register('endPoint', {
                     required: "El punto de término es obligatorio",
                  })}
               />

               {errors.endPoint && <Error>{errors.endPoint?.message}</Error>}

            </div>

            <div className="mb-5">
               <label htmlFor="transport" className="text-sm uppercase font-bold">
                  Transporte
               </label>

               <select
                  id="transport"
                  className="w-full p-3  border border-gray-100"
                  {...register('transport', {
                     required: "El transporte es obligatorio",
                  })}
               >
                  <option value="">Seleccione un transporte</option>
                  {options.map((option, index) => (
                     <option key={index} value={option}>
                        {option}
                     </option>
                  ))}
               </select>

               {errors.transport && <Error>{errors.transport?.message}</Error>}

            </div>

            <div className="mb-5">
               <label htmlFor="date" className="text-sm uppercase font-bold">
                  Fecha de viaje
               </label>

               <input
                  id="date"
                  className="w-full p-3  border border-gray-100"
                  type="date"
                  {...register('date', {
                     required: "La fecha es obligatoria",
                  })}
               />

               {errors.date && <Error>{errors.date?.message}</Error>}

            </div>

            <div className="mb-5">
               <label htmlFor="kilometers" className="text-sm uppercase font-bold">
                  Kilometros
               </label>

               <input
                  id="kilometers"
                  className="w-full p-3  border border-gray-100"
                  type="number"
                  {...register('kilometers', {
                     required: "Los kilometros son obligatorios",
                  })}
               />

               {errors.kilometers && <Error>{errors.kilometers?.message}</Error>}

            </div>

            <div className="mb-5">
               <label htmlFor="worker" className="text-sm uppercase font-bold">
                  Trabajador
               </label>

               <input
                  id="worker"
                  className="w-full p-3  border border-gray-100"
                  type="text"
                  {...register('worker', {
                     required: "El trabajador es obligatorio",
                  })}
               />

               {errors.worker && <Error>{errors.worker?.message}</Error>}

            </div>

            <div className="mb-5">
               <label htmlFor="roundTrip" className="text-sm uppercase font-bold">
                  ¿Ida y Vuelta?
               </label>

               <select
                  id="roundTrip"
                  className="w-full p-3  border border-gray-100"
                  {...register('roundTrip', {
                     required: "Este campo es obligatorio",
                  })}
               >
                  <option value="false">No</option>
                  <option value="true">Si</option>
               </select>

               {errors.roundTrip && <Error>{errors.roundTrip?.message}</Error>}

            </div>

            <input
               type="submit"
               className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
               value='Registar Traslado'
            />
         </form>
      </div>
   )
}