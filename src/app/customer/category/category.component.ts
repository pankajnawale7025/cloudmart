import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/model/Object-model';
import { CategoryService } from 'src/app/core/services/category.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements  OnInit {
  categoryList:Category[]
  categoryId:number
  private router = inject(Router);
  constructor(private categoryService:CategoryService,private route: ActivatedRoute){}
  ngOnInit(): void {
    

this.categoryService.listOfCategory().subscribe((data)=>{
  this.categoryList=data.responseData
 // console.log("List Of Category is ===>",data)
})


this.route.queryParams.subscribe(params => {
  const categoryId = params['categoryId'];
  this.categoryId=categoryId

//console.log("in  ategory components ===>",this.categoryId)


  // Now, param1Value contains the value of the 'param1' query parameter
 // console.log("category id is ",categoryId);
});






}
productsByCategory(categoryId:number){
  //this.categoryId=categoryId
  this.router.navigate(["/category"], {
    queryParams: { categoryId: categoryId }
  });
}


}
