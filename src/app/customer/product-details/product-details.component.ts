import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/model/Product';
import { CartItemService } from 'src/app/core/services/cart-item.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { ProductsService } from 'src/app/core/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService, private cs: CustomerService, private cartService: CartService, private navbarService: NavbarService,private cartItemService:CartItemService) { }

  p: any;
  productId: number;
  value: number = 1;
  showSucessMessage = false;
  response: any;
  responseforcartitem: any

  productLoaded:boolean=false;
  ngOnInit() {
    this.navbarService.navbar=true; 
    this.route.queryParams.subscribe(params => {
      const param1 = params['param1'];
      // Now you can use param1 and param2 in your component
      this.productId = param1
      //    console.log(param1);
      this.productService.getProductById(this.productId).subscribe((data) => {
        this.p = data
        this.productLoaded=true;
    //    console.log("p is ", this.p)
      })

    });
  }
  increment() {
    this.value += 1
  }

  decrement() {
    if (this.value > 1) {
      this.value -= 1
    }
    else {
      Swal.fire({
    
        position: "center",
        icon: "error",      
        title: `Atleast one quantity to be select`,
        showConfirmButton: false,
        timer: 1000

       })

    }
  }
  addToCart(productId: number) {
    if (this.cs.loggedInCustomer.name == undefined) {
      //alert("Please Login First to add product into Cart")
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not loggged in..',
        footer: '<a href="login">Login here</a>'
      })
    }
    else {
      this.cartService.addProductToCart(this.cs.loggedInCustomer?.id, productId, this.value).subscribe((data) => {
        this.response = data

        
        //     console.log("Response  is ",this.response)
        this.showSucessMessage = this.response.success
          
      if(this.showSucessMessage )
   {

       this.cartItemService.getCartItemCount(this.cs.loggedInCustomer.id).subscribe((data)=>{
      this.navbarService.cartitemCount=data.responseData
      })

     this.showSuccessAlert()
   }

        //   console.log("message is ",this.showSucessMessage )
        // setTimeout(() => {
        // this.router.navigate(['home']); 
        //   console.log('Delayed method executed.');
        // }, 5000); // 2000 milliseconds (2 seconds) delay
      }
      )
      this.cartService.viewCartItem(this.cs.loggedInCustomer?.id).subscribe((data => {
        this.responseforcartitem = data
        this.responseforcartitem = this.responseforcartitem.responseData
        this.navbarService.cartitemflag=  this.navbarService.cartitemflag?this.navbarService.cartitemflag=false:this.navbarService.cartitemflag=true
      }))


    }
  }
  showSuccessAlert() {
    Swal.fire({
      title: 'Product is Added to cart ',
      text: 'Want to shop more ?',
      icon: 'success'
    });

    this.router.navigate(['home']); 
  }
  showLoginAlert() {
    Swal.fire({
      title: 'Order placed',
      text: 'Want to shop more ?',
      icon: 'success'
    });
  }
}
