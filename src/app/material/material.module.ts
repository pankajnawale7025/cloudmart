import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';



 const MaterialComponents=[MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule,MatIconModule]

@NgModule({

  imports: [ MaterialComponents],
  exports:[ MaterialComponents]
})
export class MaterialModule { }
