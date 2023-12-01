import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/model/Object-model';
import { CartItemService } from 'src/app/core/services/cart-item.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private navbarService:NavbarService,public  productService:ProductsService,private customerService:CustomerService,private categoryService:CategoryService,private route: Router,private cartItemService:CartItemService){}
  private router = inject(Router);
  categoryList:Category[]





  toSpecificCategory(categoryId:number)
  {

      // this.router.navigate(["/category"])

      this.router.navigate(["/category"], {
        queryParams: { categoryId: categoryId }
      });







  }

  ngOnInit(): void {
    
this.navbarService.search=true;
this.navbarService.home=false;

this.categoryService.listOfCategory().subscribe((data)=>{
  this.categoryList=data.responseData
  console.log("List Of Category is ===>",data)
})
this.productService.productList().subscribe((data) => {
 this.productService.productListInProductService = data.responseData;
  
}
);
this.cartItemService.getCartItemCount(this.customerService.loggedInCustomer.id).subscribe((data)=>{
  this.navbarService.cartitemCount=data.responseData
  })
  }


  productDetails(productId: number) {

    this.route.navigate(['productDetails'], {
      queryParams: { param1: productId }
    });
  }



  
}
    