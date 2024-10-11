import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturacionComponent } from './facturacion.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearFacturaComponent } from './components/crear-facturas/crear-factura/crear-factura.component';
import { ListarFacturasComponent } from './components/listar-facturas/listar-facturas/listar-facturas.component';


@NgModule({
  declarations: [
    FacturacionComponent,
    ListaClientesComponent,
    CrearClienteComponent,
    CrearFacturaComponent,
    ListarFacturasComponent
  ],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    ReactiveFormsModule
  ]
})
export class FacturacionModule { }
