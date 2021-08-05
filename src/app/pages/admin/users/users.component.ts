import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoConfirmacionComponent } from '@app/shared/component/dialogo-confirmacion/dialogo-confirmacion.component';
import { UserResponse } from '@app/shared/models/user.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { ModalFormularioComponent } from './components/modal-formulario/modal-formulario.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();

  displayedColumns: string[] = [
    'nombre',
    'apellidos',
    'username',
    'fechaRegistro',
    'rol',
    'editar',
    'eliminar'
  ];
  lstUsers: UserResponse[] = [];

  constructor(private userSvc: UsersService, private dialog: MatDialog, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.listUsers();
  }

  private listUsers(): void {
    this.userSvc.lista()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => this.lstUsers = users);
  }

  onOpenModal(user = {}): void {
    const dialogRef = this.dialog.open(ModalFormularioComponent, {
      disableClose: true,
      data: { title: 'Nuevo usuario', user }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.listUsers();
        }
      });
  }

  onDelete(cveUsuario: number) {
    this.dialog.open(DialogoConfirmacionComponent, {
      disableClose: true,
      data: "Estas seguro de querer eliminarlo"
    }).beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.userSvc.delete(cveUsuario)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              if (result) {
                this._snackbar.open(result.message, '', {
                  duration: 6000
                });
                this.listUsers();
              }
            });
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
