import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '@app/material.modules';
import { ModalFormularioComponent } from './users/components/modal-formulario/modal-formulario.component';


@NgModule({
  declarations: [
    AdminComponent,
    ModalFormularioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
