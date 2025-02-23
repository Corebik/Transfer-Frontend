import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Authenticate = () => {

   const { startGerUser } = useAuth();

   useEffect(() => {
      startGerUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <Outlet />
      </>
   )
}
