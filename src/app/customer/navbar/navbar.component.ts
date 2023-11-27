import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/core/model/Object-model';
import { CartService } from 'src/app/core/services/cart.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchedData: string = '';
  customerLoggedIn: false;
  cartitemNumber: any=0;
  cartin: string;
  result: any;
  profileOptions:boolean=false;
  constructor(public cartService: CartService, public  cs: CustomerService, private route: Router,public  navbarService:NavbarService) { }
  ngOnInit(): void {
    this.cartitemNumber=this.navbarService.cartitem
  if(localStorage.getItem("loggedInCustomer"))
{
  this.navbarService.orderHistrory=true;
    this.navbarService.about=true;
    this.navbarService.cart=true;
    this.navbarService.login=false;
    this.navbarService.logout=true;
    this.navbarService.signUp=false;
}



  }
  

  searchData() {
    //  console.log(this.searchedData)

    // this.route.navigate(['productsHome'], {
    //   queryParams: { param1: this.searchedData }
    // });
    this.route.navigate(['search'], {
      queryParams: { param1: this.searchedData }
    });

  }
  searchDataByEvent(event: Event) {

    //  console.log(this.searchedData)

    // this.route.navigate(['productsHome'], {
    //   queryParams: { param1:this.searchedData }
    // });

  }
  xyz = new Customer();
  logoutCustomer() {
    this.changeProfileStatus();
    this.cs.loogedOutCustomer();
  }

  changeProfileStatus()
  {
    console.log(this.profileOptions)
     this.profileOptions=this.profileOptions==true?this.profileOptions=false:this.profileOptions=true;
  }

  productDetails() {
  }
}


