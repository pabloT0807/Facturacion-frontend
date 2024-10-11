import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturacionService } from '../../../services/facturacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IFacturas } from '../../../interfaces/IFacturas';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrl: './crear-factura.component.scss'
})
export class CrearFacturaComponent implements OnInit{

  facturaForm!: FormGroup;
  facturaIdUpdate!: number;
  isUpdate: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private facturacionService: FacturacionService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ){

  }
  ngOnInit(): void {
    this.facturaForm = this.formBuilder.group({
      fecha: ['',Validators.required],
      monto: ['',Validators.required],
      detalle: ['',Validators.required],
      cliente: ['',Validators.required],
    });

    this.facturaIdUpdate = +this.route.snapshot.paramMap.get('id')!;
    if(this.facturaIdUpdate){
       //EL id del cliente es un numero
       //Ejecutar un metodo para obtener el dato y afirmarle al componente que sera para actualizar
        this.cargarFactura(this.facturaIdUpdate);
    }
}
onSubmit() :void{
    if(this.facturaForm.valid){
        //los datos son validos
        const nuevaFactura  : IFacturas = this.facturaForm.value;
        if(this.isUpdate){
            //si se actualiza
            nuevaFactura.id = this.facturaIdUpdate;
            this.facturacionService.createFacturas(nuevaFactura).subscribe(
              (response :any)=>{
                console.log('se actualizo la factura');
                this.router.navigate(['home','lista-facturas']);
                this.toastr.success('Exito', 'Se actualizo correctamente');
              },
              (error: any) => {
                this.toastr.error('error, ', ' Error al actualizar la factura',{
                  timeOut : 500,
                });
              }
            )
        }else{
          //guardar
          this.facturacionService.createFacturas(nuevaFactura).subscribe(
            (response : any) => {
              console.log('se guardo correctamente');
              this.router.navigate(['home','lista-facturas']);
               this.toastr.success('Exito', 'Se guardo correctamente');
            }
          )
        }
     }else{
      this.toastr.error('Error',' Los datos no estan en el formato correcto' , {
        timeOut : 500,
      });
     }
  }
  cargarFactura(id:number){
    this.facturacionService.getFacturaById(id).subscribe(
      (factura : IFacturas) => {
        this.facturaForm.patchValue(factura);
        this.isUpdate = true;
      }
    )
  }

}
