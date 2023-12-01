import { Injectable } from '@angular/core';
import { NavbarService } from './navbar.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CartItemService } from './cart-item.service';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private navbarService:NavbarService,private http: HttpClient,private cartItemService:CartItemService,private customerService:CustomerService) { }


  //private readonly BASE_URL: string = environment.customerServiceUrl

  setCartItemCount()
  {

     console.log("You are in set cartItem method of LoginService")

    this.cartItemService.getCartItemCount(this.customerService.loggedInCustomer.id).subscribe((data)=>{
    this.navbarService.cartitemCount=data.responseData
    })
  }
      

}
