import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Menu } from '@app/shared/models/menu.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();
  lstMenu: Menu[] = [];

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.authSvc.getRol$
      .pipe(takeUntil(this.destroy$))
      .subscribe(rol => {
        if (rol == 'admin') {
          this.lstMenu = [
            {
              nombre: 'Usuarios',
              icono: 'people',
              ruta: '/admin/users'
            },
            {
              nombre: 'Categorias',
              icono: 'category',
              ruta: '/admin/categories'
            },
            {
              nombre: 'Reportes',
              icono: 'assessment',
              ruta: '/admin/reports'
            }
          ];
        } else if(rol == 'ventas') {
          this.lstMenu = [
            {
              nombre: 'Ventas',
              icono: 'shopping_bag',
              ruta: '/ventas/ventas'
            }
          ];
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onExit(): void {
    this.authSvc.logout();
  }

}
