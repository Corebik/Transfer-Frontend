import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { Auth } from '../components/Auth';
import { Authenticate } from '../components/Authenticate';
import { Login } from '../components/Login';
import { NewTransfer } from '../components/NewTransfer';
import { Register } from '../components/Register';

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<Authenticate />} >
               <Route path="/" element={<App />} />
               <Route path="/new-transfer" element={<NewTransfer />} />
               <Route path="/:transferId" element={<NewTransfer />} />
            </Route >
         </Routes>
         <Routes>
            <Route element={<Auth />} >
               <Route path="/auth/login" element={<Login />} />
               <Route path="/auth/register" element={<Register />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
};

export default Router;