import { Component, OnInit } from '@angular/core';
import { FacturacionService } from '../../services/facturacion.service';
import { ICliente } from '../../interfaces/ICliente';
import { iterator } from 'rxjs/internal/symbol/iterator';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss'
})
export class ListaClientesComponent implements OnInit{

  clientes : ICliente[] = [];

    constructor(private facturacionService : FacturacionService, private router : Router){

    }
    ngOnInit(): void {
        //obtener clientes
        this._obtenerClientes();
    }

    private _obtenerClientes(){
      //ir a consultar los clientes en el backend
      this.facturacionService.getClientes().subscribe((data:any)=>{
        this.clientes = data.map((item: ICliente) => ({
          id: item.id,
          nombre: item.nombre,
          numeroTelefono : item.numeroTelefono,
          diaCreacion: item.diaCreacion
        }));
      })
    }

    regresarHome(){
      this.router.navigateByUrl('/home');
    }

    eliminarCliente(cliente : ICliente){
      this.facturacionService.deleteCliente(cliente).subscribe((data:any)=>{
        this._obtenerClientes();
      })
    }

    editarCliente(cliente : ICliente){
        this.router.navigate(['/home/editar-cliente', cliente.id]);
    }

}
