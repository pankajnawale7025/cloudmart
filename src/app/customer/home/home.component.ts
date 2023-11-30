import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private navbarService:NavbarService,private productService:ProductsService){}
  private router = inject(Router);
  productsByCategory(categoryId:number)
  {
    // this.productService.productsByCategory(categoryId).subscribe((data)=>{

    //   this.navbarService.productListInNavbarService = data.responseData;
    
    // })

this.router.navigate(["/category"])
  }

  ngOnInit(): void {
    
this.navbarService.search=true;
this.navbarService.home=false;

  }






  
}
    