import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/core/model/Object-model';
import { CartItemService } from 'src/app/core/services/cart-item.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , DoCheck{
  searchedData: string = '';
  customerLoggedIn: false;
  cartitemNumber: any=0;
  cartin: string;
  result: any;
  profileOptions:boolean=false;
  cartitemflagInNavbar= this.navbarService.cartitemflag

cartitem:number;


  constructor(public cartService: CartService,private cartItemService:CartItemService ,public  cs: CustomerService, private route: Router,public  navbarService:NavbarService,private productService:ProductsService) { }
  ngDoCheck(): void {
    console.log("Changes in navbar ")


    if(this.cs.loggedInCustomer.cart!=undefined && this.cs!=undefined)
    {
      
      console.log("for cartitemnumber===>",this.cs.loggedInCustomer.cart)
      //  this.cartItemService.getCartItemCount(this.cs.loggedInCustomer.id).subscribe((data)=>{
      //   this.cartitem=data.responseData
      // })
    
    }




  }
  ngOnInit(): void {
    this.cartitemNumber=0
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


  refreshProductList()
  {
    this.productService.productList().subscribe((data) => {
      this.navbarService.productListInNavbarService = data.responseData;
    }
    );
    
  }


  productDetails() {
  }
}


