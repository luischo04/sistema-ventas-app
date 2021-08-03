import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private userSvc: UsersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userSvc.lista()
    .pipe(takeUntil(this.destroy$))
    .subscribe(users => this.lstUsers = users);
  }

  onOpenModal(user = {}): void {
    const dialogRef = this.dialog.open(ModalFormularioComponent, {
      disableClose: true,
      data: {title: 'Nuevo usuario', user}
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
