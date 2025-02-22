import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Error } from './Error';

import { useAuth } from '../hooks/useAuth';
import { UserLoginForm } from '../types';

import { useNavigate } from 'react-router-dom';

const initialValues: UserLoginForm = {
   email: '',
   password: '',
};

export const Login = () => {
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const { startLogin } = useAuth();

   const handleLogin = (data: UserLoginForm) => {
      startLogin(data);
      navigate('/');
   };

   return (
      <div className="mx-auto max-w-2xl">
         <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
         <p className="text-2xl text-indigo-500 font-bold mt-5 text-center">
            Iniciando Sesión
         </p>
         <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-8 p-10 mt-10 bg-white"
            noValidate
         >
            <div className="flex flex-col gap-5">
               <label className="font-normal text-2xl">Email</label>

               <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="w-full p-3  border-gray-300 border"
                  {...register('email', {
                     required: 'El Email es obligatorio',
                     pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'E-mail no válido',
                     },
                  })}
               />
               {errors.email && <Error>{errors.email.message}</Error>}
            </div>

            <div className="flex flex-col gap-5">
               <label className="font-normal text-2xl">Password</label>

               <input
                  type="password"
                  placeholder="Password de Registro"
                  className="w-full p-3  border-gray-300 border"
                  {...register('password', {
                     required: 'El Password es obligatorio',
                  })}
               />
               {errors.password && <Error>{errors.password.message}</Error>}
            </div>

            <input
               type="submit"
               value="Iniciar Sesión"
               className="bg-indigo-500 hover:bg-indigo-700 w-full p-3  text-white font-black  text-xl cursor-pointer transition duration-300 ease-in-out"
            />
         </form>

         <nav className="mt-10 flex flex-col space-y-2">
            <Link to={'/auth/register'} className="text-center text-gray-700 font-normal">
               ¿No tienes una cuenta?{' '}
               <span className="text-indigo-500 font-bold hover:text-fuchsia-700 duration-300">
                  Registrate
               </span>
            </Link>
         </nav>
      </div>
   );
};
