import { EnvironmentInjector, Injectable } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { ICliente } from '../interfaces/ICliente';
import { Observable } from 'rxjs';
import { IFacturas } from '../interfaces/IFacturas';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  private URL : string = enviroments.backurl;

  constructor(private http : HttpClient) { }

  getClientes() :  Observable<ICliente[]> {
    return this.http.get<ICliente[]>(`${this.URL}/clientes/obtenerClientes`);
  }

  //crear
  createCliente(cliente : ICliente): Observable<any>{
    return this.http.post<any>(`${this.URL}/clientes/guardar-cliente`, cliente);
  }

  //buscar por id
  getClienteById(id: number): Observable<ICliente>{
    return this.http.get<ICliente>(`${this.URL}/clientes/clientePorId/${id}`);
  }

  //eliminar
  deleteCliente(cliente: ICliente): Observable<any>{
    return this.http.delete<any>(`${this.URL}/clientes/delete-cliente/${cliente.id}`);
  }


  /********factura *******************************************************************************/
  getFacturas() :  Observable<IFacturas[]> {
    return this.http.get<IFacturas[]>(`${this.URL}/facturas/facturas`);
  }

  //crear
  createFacturas(factura : IFacturas): Observable<any>{
    return this.http.post<any>(`${this.URL}/facturas/guardarFactura`, factura);
  }

  //buscar por id
  getFacturaById(id: number): Observable<IFacturas>{
    return this.http.get<IFacturas>(`${this.URL}/facturas/facturas/id/${id}`);
  }

  //eliminar
  deleteFactura(factura: IFacturas): Observable<any>{
    return this.http.delete<any>(`${this.URL}/facturas/facturas/${factura.id}`);
  }
}
