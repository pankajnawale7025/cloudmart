import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarService } from './core/services/navbar.service';
import { Router } from '@angular/router';
import { CustomerService } from './core/services/customer.service';
import { CartItemService } from './core/services/cart-item.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'E-Commerce';

  constructor(public navbarservice: NavbarService, private router: Router, private customerService: CustomerService, private cartItemService: CartItemService) { }
  ngOnInit(): void {
    if (localStorage.getItem("loggedInCustomer")) {
      const storedCustomerData = localStorage.getItem("loggedInCustomer");
      if (storedCustomerData) {
        const loggedInCustom = JSON.parse(storedCustomerData);
        this.customerService.loggedInCustomer = loggedInCustom
      //  console.log("this.customerService.loggedInCustomer in app.ts is ", this.customerService.loggedInCustomer)
        this.cartItemService.getCartItemCount(this.customerService.loggedInCustomer.id).subscribe((data) => {
          this.navbarservice.cartitemCount = data.responseData
       //   console.log("this.navbarservice.cartitemCount===>", this.navbarservice.cartitemCount)
        })

      }

      // this.router.navigate([('home')])


    }
  }


}


