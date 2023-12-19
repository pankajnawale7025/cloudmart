import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



 const MaterialComponents=[MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule]

@NgModule({

  imports: [ MaterialComponents],
  exports:[ MaterialComponents]
})
export class MaterialModule { }
