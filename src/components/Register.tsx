import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Error } from './Error';

import { useAuth } from '../hooks/useAuth';
import { UserRegisterForm } from '../types';

const initialValues: UserRegisterForm = {
   name: '',
   email: '',
   password: '',
   confirmPassword: '',
};

export const Register = () => {

   const navigate = useNavigate();
   const { startRegister } = useAuth();

   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
   } = useForm<UserRegisterForm>({ defaultValues: initialValues });

   const password = watch('password');

   const handleRegister = (formData: UserRegisterForm) => {
      console.log("Submit Register")
      startRegister(formData);
      reset();
      navigate("/auth/login");
   };

   return (
      <div className="mx-auto max-w-2xl">
         <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
         <p className="text-2xl text-indigo-500 font-bold mt-5 text-center">
            Crea tu Cuenta
         </p>

         <form
            onSubmit={handleSubmit(handleRegister)}
            className="px-10  bg-white mt-10"
            noValidate
         >
            <div className="flex flex-col gap-5 pb-6">
               <label className="font-normal text-2xl" htmlFor="email">
                  Email
               </label>
               <input
                  id="email"
                  type="email"
                  placeholder="Email de Usuario"
                  className="w-full p-3  border-gray-300 border"
                  {...register('email', {
                     required: 'El Email de registro es obligatorio',
                     pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'E-mail no válido',
                     },
                  })}
               />
               {errors.email && <Error>{errors.email.message}</Error>}
            </div>

            <div className="flex flex-col gap-5 pb-6">
               <label className="font-normal text-2xl">Nombre</label>
               <input
                  type="name"
                  placeholder="Nombre de Usuario"
                  className="w-full p-3  border-gray-300 border"
                  {...register('name', {
                     required: 'El Nombre de usuario es obligatorio',
                  })}
               />
               {errors.name && <Error>{errors.name.message}</Error>}
            </div>

            <div className="flex flex-col gap-5 pb-6">
               <label className="font-normal text-2xl">Password</label>

               <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3  border-gray-300 border"
                  {...register('password', {
                     required: 'El Password es obligatorio',
                     minLength: {
                        value: 8,
                        message: 'El Password debe ser mínimo de 8 caracteres',
                     },
                  })}
               />
               {errors.password && <Error>{errors.password.message}</Error>}
            </div>

            <div className="flex flex-col gap-5 pb-6">
               <label className="font-normal text-2xl">Repetir Password</label>

               <input
                  id="password_confirmation"
                  type="password"
                  placeholder="Repite Password de Registro"
                  className="w-full p-3  border-gray-300 border"
                  {...register('confirmPassword', {
                     required: 'Repetir Password es obligatorio',
                     validate: (value) => value === password || 'Los Passwords no son iguales',
                  })}
               />

               {errors.confirmPassword && (
                  <Error>{errors.confirmPassword.message}</Error>
               )}
            </div>

            <input
               type="submit"
               value="Registrarme"
               className="bg-indigo-500 hover:bg-indigo-600 w-full p-3  text-white font-black  text-xl cursor-pointer"
            />
         </form>

         <nav className="mt-10 flex flex-col space-y-2">
            <Link to={'/auth/login'} className="text-center text-gray-300 font-normal">
               ¿Ya tienes cuenta?{' '}
               <span className="text-indigo-500 font-bold hover:text-indigo-600 duration-300">
                  Iniciar Sesión
               </span>
            </Link>
         </nav>
      </div>
   );
};
