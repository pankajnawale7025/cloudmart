import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private navbarService:NavbarService){}
  ngOnInit(): void {
    
this.navbarService.search=true;
this.navbarService.home=false;

  }

}
    