import { ICliente } from "./ICliente";

export interface IFacturas{
  id: number,
  fecha: string,
  monto: number,
  detalle: string,
  cliente: ICliente

}
