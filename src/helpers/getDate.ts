export const getDateFormat = (fecha: string): string => {
   const date = new Date(fecha);
   return date
      .toLocaleDateString('es-ES', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
      })
      .replace(/\//g, '-');
};

export const getFormDate = (fecha: string): string => {
   const date = new Date(fecha);
   return date.toISOString().split('T')[0]; // devuelve la fecha en formato yyyy-MM-dd
};
