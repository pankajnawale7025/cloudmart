import { Component } from '@angular/core';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {


  constructor(private navbarservice:NavbarService){
this.navbarservice.navbar=false;



  }

}
