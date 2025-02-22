import { UseFormRegister } from "react-hook-form";
import { FormTypes, TransferForm } from "../types";

type Props = {
   register: UseFormRegister<TransferForm>
   input: FormTypes
}

export const FormInputs = ({ register, input }: Props) => {

   return (
      <input
         id={input.input}
         className="w-full p-3  border border-gray-100"
         type={input.type}
         {...register('startPoint', {
            required: "El nombre del paciente es obligatorio",
         })}
      />
   )
}
