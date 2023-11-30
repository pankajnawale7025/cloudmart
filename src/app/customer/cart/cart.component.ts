import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItemService } from 'src/app/core/services/cart-item.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  constructor(private car: CartService, private cs: CustomerService, private cartiCartItemService: CartItemService,private aRroute:ActivatedRoute,private navbarService :NavbarService){ }

  showcartitem: boolean = false;
  showerrmsg: boolean = false;
  showprocessbtn: boolean = false;
  showfinalTotalPrice:boolean=false;
  finaltotalPrice: number = 0;

  ngOnInit(): void {
    this.viewCart();
  }


  cartItems: any;
  cartItemsforprice: any;


  viewCart(): void {

    this.car.viewCartItem(this.cs.loggedInCustomer?.id).subscribe((data) => {
      this.cartItems = data

      
      if (this.cartItems.responseData.length > 0) {
        this.showcartitem = true;
        this.showprocessbtn = true;
        this.finalTotalPrice();
      }
      else {
        this.showerrmsg = true;
      }
      console.log('cartItem is :', this.cartItems.responseData)
    }
    )
  }

  deleteItemFromCart(cartItemID: number) {


   

    this.cartiCartItemService.deleteFromCart(cartItemID).subscribe((data) => {
      console.log(data)
      this.showfinalTotalPrice=false;
        this.showprocessbtn = false;
        this.navbarService.cartitemflag=  this.navbarService.cartitemflag?this.navbarService.cartitemflag=false:this.navbarService.cartitemflag=true
      this.viewCart();
    })
  }


  finalTotalPrice(): void {
    this.showfinalTotalPrice=true
    this.car.viewCartItem(this.cs.loggedInCustomer?.id).subscribe((data) => {
      this.cartItemsforprice = data;
     this.finaltotalPrice=this.cartItemsforprice.responseData.reduce((total: number, item:any) => total + item.totalPrice, 0).toFixed(2);
      
    })
  }

  private router = inject(Router);

  processOrder(){
  this.router.navigate(['/order']);
  }
  
  updateQuantity(productId: number,cartID:number)
  {
    this.deleteItemFromCart(cartID)
  console.log(productId,cartID)
    this.router.navigate(['productDetails'], {
      queryParams: { param1: productId }
    });
  }



  toHome()
  {
    this.router.navigate(['home'])

  }

}
