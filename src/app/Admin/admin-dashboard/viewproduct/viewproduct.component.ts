import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Product } from 'src/app/core/model/Product';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'viewproduct',
  
  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.css'
})
export class ViewproductComponent implements OnInit {


constructor(private productService:ProductsService,private router:Router){}


productList: Product[] = []
totalPagesarray:number[]=[]
  ngOnInit(): void {
    this.productService.allProduct().subscribe((data => {
     this.productList=[...data.responseData.content]
     this.totalPagesarray=new Array(data.responseData.totalPages)
     console.log(this.productList)

      console.log("allProduct() internal getproduct repsonse is  on init ==>", data)
    }));
  }

  backToManageProduct()
  {
    console.log("hii")
    this.router.navigate(['/Adminlogin/manageProduct']);
  }


  deleteProduct(item:Product)
  {

  }
  updateProduct(item:Product)
  {

  }
  ascOrder(name:any)
  {

  }
  descOrder(name:any)
  {

  }

}
