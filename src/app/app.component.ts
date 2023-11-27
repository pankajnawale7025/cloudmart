import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarService } from './core/services/navbar.service';
import { Router } from '@angular/router';
import { CustomerService } from './core/services/customer.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'E-Commerce';

  constructor(public navbarservice: NavbarService,private router:Router,private customerService:CustomerService) { }
  ngOnInit(): void {
  if (localStorage.getItem("loggedInCustomer")) {

    const storedCustomerData = localStorage.getItem("loggedInCustomer");
    if(storedCustomerData)
    {
            const loggedInCustom = JSON.parse(storedCustomerData);
      this.customerService.loggedInCustomer=loggedInCustom
      console.log("this.customerService.loggedInCustomer in app.ts is ",this.customerService.loggedInCustomer)
    }

     this.router.navigate([('home')])


    }
  }


  }


