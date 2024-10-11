import { Component, OnInit } from '@angular/core';
import { IFacturas } from '../../../interfaces/IFacturas';
import { FacturacionService } from '../../../services/facturacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-facturas',
  templateUrl: './listar-facturas.component.html',
  styleUrl: './listar-facturas.component.scss'
})
export class ListarFacturasComponent implements OnInit{

  facturas : IFacturas[] = [];

  constructor(private facturacionService : FacturacionService, private router : Router){

  }

  ngOnInit(): void {
      this._obtenerFacturas();
  }

  private _obtenerFacturas(){
    //ir a consultar los clientes en el backend
    this.facturacionService.getFacturas().subscribe((data:any)=>{
      this.facturas = data.map((item: IFacturas) => ({
        id: item.id,
        fecha: item.fecha,
        monto : item.monto,
        detalle: item.detalle,
        cliente: item.cliente
      }));
    })
  }

  regresarHome(){
    this.router.navigateByUrl('/home');
  }

  eliminarFactura(factura : IFacturas){
    this.facturacionService.deleteFactura(factura).subscribe((data:any)=>{
      this._obtenerFacturas();
    })
  }
  editarFactura(factura : IFacturas){
    this.router.navigate(['/home/editar-facturas', factura.id]);
}

}
