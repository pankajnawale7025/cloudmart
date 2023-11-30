import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {


   cartitemflag:boolean=false;
    
  constructor() { }


  home:boolean=true;
  login:boolean=true;
  signUp:boolean=true;
  search:boolean=true;

  about:boolean=false;
  cart:boolean=false;
  products:boolean=false;
  orderHistrory:boolean=false;
  logout:boolean=false;
  admin:boolean=false;
  navbar:boolean=true;

  productListInNavbarService = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 19.99,
      imageurl: "assets/Perfume.jpg",
      discount: 0
    }
  ];













}
