import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturacionService } from '../../services/facturacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICliente } from '../../interfaces/ICliente';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.scss'
})
export class CrearClienteComponent implements OnInit{

  clienteForm!: FormGroup;
  clienteIdUpdate!: number;
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
      this.clienteForm = this.formBuilder.group({
        nombre: ['',Validators.required],
        numeroTelefono: ['',Validators.required],
        diaCreacion: [new Date(), Validators.required],
      });

      this.clienteIdUpdate = +this.route.snapshot.paramMap.get('id')!;
      if(this.clienteIdUpdate){
         //EL id del cliente es un numero
         //Ejecutar un metodo para obtener el dato y afirmarle al componente que sera para actualizar
          this.cargarCliente(this.clienteIdUpdate);
      }
  }
  onSubmit() :void{
      if(this.clienteForm.valid){
          //los datos son validos
          const nuevoCliente  : ICliente = this.clienteForm.value;
          if(this.isUpdate){
              //si se actualiza
              nuevoCliente.id = this.clienteIdUpdate;
              this.facturacionService.createCliente(nuevoCliente).subscribe(
                (response :any)=>{
                  console.log('se actualizo el cliente');
                  this.router.navigate(['home','lista-clientes']);
                  this.toastr.success('Exito', 'Se actualizo correctamente');
                },
                (error: any) => {
                  this.toastr.error('error, ', ' Error al actualizar el usuario',{
                    timeOut : 500,
                  });
                }
              )
          }else{
            //guardar
            this.facturacionService.createCliente(nuevoCliente).subscribe(
              (response : any) => {
                console.log('se guardo correctamente');
                this.router.navigate(['home','lista-clientes']);
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
    cargarCliente(id:number){
      this.facturacionService.getClienteById(id).subscribe(
        (cliente : ICliente) => {
          this.clienteForm.patchValue(cliente);
          this.isUpdate = true;
        }
      )
    }

}
