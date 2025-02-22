import { Transfer } from '../types';
export const handleHuella = (km: Transfer['kilometers'], transport: Transfer['transport']) => {
   switch (transport) {
      case 'Metro (Tren, Subway, Subterráneo)':
         return km * 0.033;
      case 'Auto (Gasolina)':
         return km * 0.21;
      case 'Camioneta (Diesel)':
         return km * 0.246;
      case 'Motocicleta (Gasolina)':
         return km * 0.092;
      case 'Bus Transantiago (Transporte público)':
         return km * 0.039;
      case 'Bus (Vehículo privado)':
         return km * 0.012;
      case 'Avión (Nacional)':
         return km * 0.279;
      case 'Avión (Internacional)':
         return km * 0.179;
      default:
         return 0;
   }
};
