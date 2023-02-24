//Normalmente se usa una carpeta para crear modelos y no dejarlos en el directorio base

export interface Flight{
     id?: number;
     origin: string; 
     destination: string; 
     flightNumber: number; 
     depart: Date; 
     arrive: Date; 
     nonstop: boolean }; 