import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

const myModules = [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
];

@NgModule({
    /**
     *  A traves de los tres puntos nosotros le indicamos que se trata de un arreglo el que queremos exportar.
     */
    imports: [...myModules],
    exports: [...myModules]
})

export class MaterialModule { }