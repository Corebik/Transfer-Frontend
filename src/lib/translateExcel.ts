export const translateProperty = (property: string): string => {
   const translations: { [key: string]: string } = {
      startPoint: 'Punto de partida',
      endPoint: 'Punto de llegada',
      transport: 'Transporte',
      worker: 'Trabajador',
      kilometers: 'Kilometros',
      date: 'Fecha',
      roundTrip: 'Ida y Vuelta',
   };
   return translations[property] || property;
};
