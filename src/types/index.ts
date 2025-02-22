import { z } from 'zod';

//*TRANSFER SCHEMAS
export const TransportSchema = z.enum([
   'Metro (Tren, Subway, Subterráneo)',
   'Auto (Gasolina)',
   'Camioneta (Diesel)',
   'Motocicleta (Gasolina)',
   'Bus Transantiago (Transporte público)',
   'Bus (Vehículo privado)',
   'Avión (Nacional)',
   'Avión (Internacional)',
]);

export const TransferSchema = z.object({
   _id: z.string(),
   startPoint: z.string(),
   endPoint: z.string(),
   transport: TransportSchema,
   kilometers: z.number(),
   date: z.string(),
   worker: z.string(),
   roundTrip: z.boolean(),
});

export const GetTransfersSchema = z.array(TransferSchema);

//* TRANSFER TYPES
export type Transfer = z.infer<typeof TransferSchema>;
export type TransferForm = Omit<Transfer, '_id'>;

//* AUTH SCHEMAS
export const AuthSchema = z.object({
   email: z.string().email(),
   password: z.string(),
   name: z.string(),
   confirmPassword: z.string(),
   token: z.string(),
});

//* AUTH TYPES
export type Auth = z.infer<typeof AuthSchema>;
export type UserLogin = Pick<Auth, 'email' | 'password'>;
export type UserRegister = Pick<Auth, 'email' | 'password' | 'name' | 'confirmPassword'>;

//*Server Schemas
export const serverResponseSchema = z.object({
   ok: z.boolean(),
   msg: z.string(),
   token: z.string(),
});

//*Server Types
export type ServerResponseSchema = z.infer<typeof serverResponseSchema>;
export type ServerResponse = Pick<ServerResponseSchema, 'ok' | 'msg'>;
export type ServerLoginResponse = Pick<ServerResponseSchema, 'ok' | 'token'>;

//*User Schemas
export const UserSchema = z.object({
   email: z.string().email(),
   name: z.string(),
   password: z.string(),
   confirmPassword: z.string(),
   token: z.string(),
   _id: z.string(),
});

//*User Types
export type User = z.infer<typeof UserSchema>;
export type UserLoginForm = Pick<User, 'email' | 'password'>;
export type UserRegisterForm = Pick<User, 'email' | 'password' | 'name' | 'confirmPassword'>;
export type UserInfo = Pick<User, 'email' | 'name' | '_id'>;
