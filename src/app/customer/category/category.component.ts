import { Component, OnInit } from '@angular/core';
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

  constructor(private categoryService:CategoryService){}
  ngOnInit(): void {
    

this.categoryService.listOfCategory().subscribe((data)=>{
  this.categoryList=data.responseData
  console.log("List Of Category is ===>",data)
})
}
productsByCategory(){

}


}
