import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {
  forma: FormGroup;
  clientes: string[] = ['Claro', 'Entel', 'BCP', 'BBVA', 'interbank'];
  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(4), this.noRicardo] ),
        apellido: new FormControl('', [Validators.required,Validators.minLength(4)])
      }),
      cargo: new FormControl('', [Validators.required, Validators.minLength(4), this.noAdmin] ),
      usuario:new FormControl('',[Validators.required,Validators.minLength(4)],this.existeusuario),
      pass: new FormControl('', [Validators.required,Validators.minLength(4)]),
      pass2: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      cliente: new FormControl('', Validators.required),
      vacaciones: new FormControl(false, Validators.required),
      intereses: new FormArray([
        new FormControl('',Validators.required)
      ])
    });

    this.forma.controls.pass2.setValidators([
      Validators.required,Validators.minLength(4),
      this.noIgual.bind(this.forma) 
    ]);
   }

  ngOnInit(): void {
  }

  guardar() {
    console.log(this.forma);
  }

  agregarIntereses() {
    const intereses = this.forma.controls.intereses as FormArray;
    intereses.push(new FormControl('', Validators.required,));
  }

  noRicardo(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'Ricardo') {
      return { noRicardo: true };
    }
  }
  noAdmin(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'Administrador') {
      return { noAdmin: true };
    }
  }
  noIgual(control: FormControl): {[s: string]: boolean} {
    const forma: any = this; // this = this.forma
    if(control.value !== forma.controls.pass.value) {
      return { noigual: true };
    }
  }
  
  existeusuario(control:FormControl):Promise <any> | Observable<any>{
    const promesa = new Promise(
      (resolve,rejects) => {
        setTimeout(() =>{
          if(control.value==='ricky') {
            resolve({existe:true})
          } else {
            resolve(null);
          }
        },3000);
      }
    );
    return promesa;
  }
  

}
