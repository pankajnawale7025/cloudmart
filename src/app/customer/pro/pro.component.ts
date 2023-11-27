import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Response } from 'src/app/core/model/Object-model';
import { CustomerService } from 'src/app/core/services/customer.service';
import { CartService } from 'src/app/core/services/cart.service';
@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {


  response = new Response();
  temp: any;
  quantity: number;
  re: any;
  totalPagesarray: any[];
  totalPages: number;
  pageSize = 5;
  no = 0;
  constructor(private productService: ProductsService, private cas: CartService, private cs: CustomerService) { }

  ngOnInit(): void {


    this.productService.allProduct().subscribe((data) => {
      this.response = data
      this.totalPages = this.response.responseData.totalPages;
      this.totalPagesarray = new Array(this.totalPages);
      console.log(data)
    })


  }

  setQuantity(event: Event): void {
    //  this.quantity=
    this.quantity = parseInt((event.target as HTMLInputElement).value);
  }


  addProductToCart(product: any): void {

    if (this.quantity <= 0 || this.quantity == undefined || isNaN(this.quantity) || this.cs.loggedInCustomer?.id == undefined) {
      alert("Please Enter right Quantity or login again");
    }
    else {

      this.cas.addProductToCart(this.cs.loggedInCustomer?.id, product.id, this.quantity).subscribe((data) => {

  


        


        //  console.log('output of the addProductToCart is :',data)
        alert("product added into the cart succefully wanna do more shopping ");

      })

    }
    // console.log(this.cs.loggedInCustomer.id)
    // console.log(product.id)
    // console.log(this.quantity)

  }
  getPageWiseProduct(no: number, pagesize: number): void {
    this.productService.getSpecificProduct(no, this.pageSize).subscribe((data) => {
      console.log(no);
      this.response = data;
      this.totalPages = this.response.responseData.totalPages;
      this.totalPagesarray = new Array(this.totalPages);
      console.log(this.re.responseData.content);

    })
  }

  onPageSizeBtnClick(event: any) {
    this.pageSize = event.target.value
    this.productService.getSpecificProduct(this.no, this.pageSize).subscribe((data) => {
      console.log(this.no);
      this.response = data;
      this.totalPages = this.response.responseData.totalPages;
      this.totalPagesarray = new Array(this.totalPages);
      console.log(this.re.responseData.content);

    })
    console.log(this.pageSize)
  }
  ascOrder(columnname: string) {
    console.log(columnname);
    console.log(this.response.responseData.content);
  
    if (Array.isArray(this.response.responseData.content)) {
      this.response.responseData.content = this.response.responseData.content.sort((a: any, b: any) => {
        const columnA = a[columnname];
        const columnB = b[columnname];
  
        if (columnA > columnB) {
          return 1; // Sort in descending order
        } else if (columnA < columnB) {
          return -1; // Sort in descending order
        } else {
          return 0; // No change in order
        }
      });
  
      console.log(this.response.responseData.content);
    } else {
      console.error('content is not an array or does not exist.');
    }
  }



  
  descOrder(columnname: string) {

    console.log(columnname);
    console.log(this.response.responseData.content);
  
    if (Array.isArray(this.response.responseData.content)) {
      this.response.responseData.content = this.response.responseData.content.sort((a: any, b: any) => {
        const columnA = a[columnname];
        const columnB = b[columnname];
  
        if (columnA < columnB) {
          return 1; // Sort in descending order
        } else if (columnA > columnB) {
          return -1; // Sort in descending order
        } else {
          return 0; // No change in order
        }
      });
  
      console.log(this.response.responseData.content);
    } else {
      console.error('content is not an array or does not exist.');
    }
  }


}


