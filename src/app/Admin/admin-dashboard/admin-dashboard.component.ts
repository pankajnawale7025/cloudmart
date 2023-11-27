import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/core/model/Product';
import { CustomerService } from 'src/app/core/services/customer.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  constructor(private customerService: CustomerService, private productService: ProductsService,private route :Router,private navbarService:NavbarService) { }
  customerList = []
  productList = []
  totalPages: number;
  totalPagesarray: any[];
  addProductTableDiv: boolean;
  showPrTable: boolean = false;
  
  ngOnInit(): void {

    this.navbarService.search=false;
    this.navbarService.login=true;
    
    this.customerService.viewAllCustomer().subscribe((data) => {
      this.customerList = data.responseData
    })




    this.productService.productList().subscribe((data) => {
      this.productList = data.responseData
    })
  }


  re: any;
  showProductTable(): void {
    this.showPrTable = this.showPrTable == true ? false : true;
    this.addProductTableDiv = false;
    this.productService.allProduct().subscribe((data) => {
      this.re = data.responseData
      this.totalPages = data.responseData.totalPages;
      // this.totalPagesarray = new Array(this.totalPages);
      console.log(this.re)
    })
  }

  getPageWiseProduct(no: number, pagesize: number): void {
    this.productService.getSpecificProduct(no, this.pageSize).subscribe((data) => {
      console.log(no);
      this.re = data.responseData;
      console.log(this.re.responseData.content);

    })
  }

  pageSize = 5;
  no = 0;
  onPageSizeBtnClick(event: any) {
    this.pageSize = event.target.value
    this.productService.getSpecificProduct(this.no, this.pageSize).subscribe((data) => {
      console.log(this.no);
      this.re = data.responseData;
      console.log("re is :", this.re);

      this.totalPages = this.re.totalPages;
      this.totalPagesarray = new Array(this.totalPages);

    })
    console.log(this.pageSize)
  }
  product = new Product();
  public deleteProduct(data: any): void {
    // console.log(data)
    this.product.id = data.id;
    this.product.name = data.name;
    this.product.category = data.category;
    this.product.price = data.price;
    console.log("Product deleted Sucessfully")
    this.productService.deleteProduct(this.product).subscribe((data1) => {
      this.re = "Product deleted Sucessfully";
      this.showProductTable()

      // this.productService.getAllProduct().subscribe((data1) => {
      //   this.re = data1.responseData;
      //   // writr here logic to show searched  data
      //   //  console.log(this.re.responseData);
      // });
      console.log(this.re);
      this.showPrTable = true;
    })
  }




  addProduct() {
    this.addProductTableDiv = this.addProductTableDiv == true ? false : true;
  }



renderuser()
{
  
  console.log("hii")
this.route.navigate(['ManageUSer']);
}


}
