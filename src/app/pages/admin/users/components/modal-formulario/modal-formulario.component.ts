import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '@app/pages/admin/services/users.service';
import { Rol } from '@app/shared/models/rol.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
enum Action{
  EDIT = "",
  NEW = ""
}

@Component({
  selector: 'app-modal-formulario',
  templateUrl: './modal-formulario.component.html',
  styleUrls: ['./modal-formulario.component.scss']
})
export class ModalFormularioComponent implements OnInit, OnDestroy {

  // Variables
  actionTODO = Action.NEW;
  private destroy$ = new Subject<any>();
  roles: Rol[] = [];

  userForm = this.fb.group({
    nombre : ['', [Validators.required]],
    apellidos : ['', [Validators.required]],
    username : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(4)]],
    cveRol : ['', [Validators.required]]
  })

  constructor(public dialogRef: MatDialogRef<ModalFormularioComponent> ,@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private UsersSvc: UsersService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getRoles();

    if(this.data?.user.hasOwnProperty("cveUsuario")){
      this.actionTODO = Action.EDIT;
      this.data.title = "Editar usuario"
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete()
  }

  private getRoles(): void {
    this.UsersSvc.getRol()
    .pipe(takeUntil(this.destroy$))
    .subscribe(roles => this.roles = roles)
  }

  onSave(): void{
    if(this.userForm.invalid){
      return;
    }
    
    const formValue = this.userForm.value;

    if(this.actionTODO == Action.NEW) {
      // Insert
      this.UsersSvc.new(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this._snackBar.open(result.message, '', {
          duration: 6000
        });
        this.dialogRef.close(true);
      });
    } else {
      // Update
    }

    console.log(this.UsersSvc);
  }

  getErrorMessage(field: string): string{
    let message = "";

    const element = this.userForm.get(field);

    if(element?.errors){
      const messages: any = {
        required : "Este campo es requerido",
        email : "El formato no es correcto",
        minLength : "Los caracteres minimos son 4"
      };

      const errorKey = Object.keys(element?.errors).find(Boolean);
      message = String(messages[String(errorKey)]);
    }

    return message;
  }

}
