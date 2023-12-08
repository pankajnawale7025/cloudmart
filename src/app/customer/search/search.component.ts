import { Component, OnChanges, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  data: string;
  result: any;

  constructor(private aroute: ActivatedRoute, private route: Router, private productService: ProductsService, private navbarService: NavbarService) { }

  priceRangeOptions: Options = {
    floor: 0,
    ceil: 1000,
  };

  // Define variables to store the selected price range
  min: number = 0;
  max: number = 100000;


  ngOnInit(): void {
    this.aroute.queryParams.subscribe(params => {
      const param1 = params['param1'];
      this.data = param1;
     // console.log("this.data is :", this.data)
    })

    this.navbarService.navbar = false;
    this.productService.searchProducts(this.data).subscribe((response) => {
     // console.log("this.response is :", response)
      this.result = response;

      this.result = this.result.responseData
    //  console.log("this.result is :", this.result)
    })
  }
  productDetails(productId: number) {

    this.route.navigate(['productDetails'], {
      queryParams: { param1: productId }
    });
  }
  toHome() {
    this.navbarService.navbar = true;
    this.route.navigate(['home'])
  }

  searchDataByEvent() {
 //   console.log("data is :", this.data)
    this.productService.searchProducts(this.data).subscribe((response) => {
   //   console.log("this.response is :", response)
      this.result = response;
      this.result = this.result.responseData
   //   console.log("this.result is :", this.result)
    })
  }

  applyFilter() {

    if (!isNaN(this.min) && !isNaN(this.max) && this.min < this.max) {

      this.productService.priceFilter(this.min, this.max).subscribe((data => {
        this.result = data;
        this.result = this.result.responseData
      }))
    }
    else {
      alert("Insert Valid Range")
    }
  }















}
