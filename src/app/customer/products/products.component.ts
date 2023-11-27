import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { Product } from 'src/app/core/model/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  value: number = 1;
  searchData: string = 'null'
  errmsgforsearch=false;


  constructor(private aroute: ActivatedRoute, private route: Router, private productService: ProductsService) {
   // console.log('constructor invoke !!!!');
   }

  
backToHome()
{
  this.route.navigate(['home'])
}



  ngOnInit(): void {
     this.productService.productList().subscribe((data) => {
       this.productList = data.responseData;
       console.log("this.productList is ",this.productList)
     }
     ) 
    console.log('init invoke !!!!');   
}
  
  
  refreshproductlist()
  {
    this.productService.productList().subscribe((data) => {
      this.productList = data.responseData;
    }
    ) 
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
      imageurl: "assets/Perfume.jpg"
    }
  ]

  productDetails(productId: number) {

    this.route.navigate(['productDetails'], {
      queryParams: { param1: productId }
    });
  }
}