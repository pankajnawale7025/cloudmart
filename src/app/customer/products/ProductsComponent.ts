import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/model/Product';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { CartItemService } from 'src/app/core/services/cart-item.service';
import { Customer } from 'src/app/core/model/Object-model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit,OnChanges  {

  value: number = 1;
  searchData: string = 'null';
  errmsgforsearch = false;

  @Input() categoryId:number
  constructor(private aroute: ActivatedRoute, private route: Router, public productService: ProductsService, public navbarService: NavbarService, private cartService: CartItemService) {
    // console.log('constructor invoke !!!!');
  }
  ngOnChanges(changes: SimpleChanges): void {
    
console.log("categoryId in product is ",this.categoryId)
    if(this.categoryId!=undefined)
    this.productService.productsByCategory(this.categoryId).subscribe((data)=>{
      console.log(data)
      this.productService.productListInProductService=data.responseData
    })

  }


  backToHome() {
    this.route.navigate(['home']);
  }

   tempCustomer: Customer = {
    id: 1,
    name: "John",
    surName: "Doe",
    contactNumber: "123-456-7890",
    emailAddress: "john.doe@example.com",
    address: "123 Main Street, Cityville",
    customerOrderList: [
      { orderId: 101, product: "Product A", quantity: 2 },
      { orderId: 102, product: "Product B", quantity: 1 },
    ],
    cart: [
      { productId: 201, product: "Product C", quantity: 3 },
      { productId: 202, product: "Product D", quantity: 1 },
    ],
  }

  ngOnInit(): void {
    this.productService.productList().subscribe((data) => {
      // this.navbarService.productListInNavbarService = data.responseData;
      console.log("this.productList is ", this.productList);
    }
    );
    console.log('init invoke !!!!');
    // const loggedInCustomerString: string | null = localStorage.getItem("loggedInCustomer");
    // if (loggedInCustomerString !== null) {
    //   const loggedInCustomer = JSON.parse(loggedInCustomerString);
    //   console.log("loggedInCustomer.id;===> ", loggedInCustomer.id);

    //   tempCustomer: Customer;
    //   console.log(this.tempCustomer);
    //   this.tempCustomer.id = 125;
    //   this.tempCustomer.id = loggedInCustomer.id;
    //   console.log("loggedInCustomer.id;===> ", loggedInCustomer.id);
    //   console.log("tempcustomer ===> ", this.tempCustomer);
     
    //   this.cartService.getCartitemsNumbers(this.tempCustomer).subscribe((data) => {
    //     console.log("getitemnumbers resposne is ==>", data);

    //   });
    //   //         this.navbarService.cartitem=loggedInCustomer.cart.cartitemList.length
    // } else {
    //   // Handle the case where the key is not found in localStorage
    //   console.log("loggedInCustomer not found in localStorage");
    // }
  }


  refreshproductlist() {
    this.productService.productList().subscribe((data) => {
      this.productList = data.responseData;
    }
    );
  }



  productsByCategory(categoryId:number)
  {
    this.productService.productsByCategory(categoryId).subscribe((data)=>{

      this.navbarService.productListInNavbarService = data.responseData;
      

    })
  }




  // if (this.searchData != 'null') {
  //   console.log('hii in cindition')
  //         this.aroute.queryParams.subscribe(params => {
  //           const param1 = params['param1'];
  //           // Now you can use param1 and param2 in your component
  //           this.searchData = param1
  //           //console.log(this.searchData)
  //           this.productService.productList().subscribe((data) => {
  //             this.productList = data.responseData;
  //           }
  //           )
  //            console.log("prodcut list is ",this.productList)
  //         });
  //       }
  result: Product[] = [];



  productList = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 19.99,
      imageurl: "assets/Perfume.jpg",
      discount: 0
    }
  ];

  productDetails(productId: number) {

    this.route.navigate(['productDetails'], {
      queryParams: { param1: productId }
    });
  }
}
