import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturacionComponent } from './facturacion.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ListarFacturasComponent } from './components/listar-facturas/listar-facturas/listar-facturas.component';
import { CrearFacturaComponent } from './components/crear-facturas/crear-factura/crear-factura.component';

const routes: Routes = [
  {
    path: 'lista-clientes', component: ListaClientesComponent
  },
  {path: 'crear-cliente' , component : CrearClienteComponent},
  {path: 'editar-cliente/id', component: CrearClienteComponent},
  {path: 'lista-facturas' , component: ListarFacturasComponent},
  {path: 'crear-factura', component: CrearFacturaComponent},
  {path: 'editar-facturas/id' , component: CrearFacturaComponent},

  {
    path: '',
    component: FacturacionComponent

  },
  {
    path: '**',
    redirectTo: 'home',

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturacionRoutingModule { }
