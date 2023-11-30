import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/model/Object-model';
import { CategoryService } from 'src/app/core/services/category.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private navbarService:NavbarService,private productService:ProductsService,private categoryService:CategoryService){}
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


  }






  
}
    