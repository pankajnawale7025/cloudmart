import { Component, OnChanges, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavbarService } from 'src/app/core/services/navbar.service';
import { ProductsService } from 'src/app/core/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  data: string;
  result: any;
  checkboxValue: boolean = false;

  constructor(private aroute: ActivatedRoute, private route: Router, private productService: ProductsService, private navbarService: NavbarService) { }

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
      this.result = response;
      this.result = this.result.responseData
      console.log("this.result is :", this.result)

      if ((this.result.length == 0)) {
        Swal.fire({
          title: 'Sorry..!',
          text: 'we dont sell this',
          icon: 'info', // Set the icon (info, success, error, warning, question)
          showConfirmButton: false, // Hide the default confirmation button
          timer: 1000 // Auto-close the alert after 3000 milliseconds (3 seconds)
        });
      }

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
    //   console.log("data is :", this.data)gx xvf
    this.productService.searchProducts(this.data).subscribe((response) => {
      //   console.log("this.response is :", response)
      this.result = response;
      this.result = this.result.responseData
      console.log("this.result in searchDataByEvent()==>", this.result)
      if (this.result.length == 0) {
        Swal.fire({
          title: 'Sorry..!',
          text: 'we dont sell this',
          icon: 'info', // Set the icon (info, success, error, warning, question)
          showConfirmButton: false, // Hide the default confirmation button
          timer: 3000 // Auto-close the alert after 3000 milliseconds (3 seconds)
        });
      }
      //   console.log("this.result is :", this.result)
    })
  }

  applyFilter() {
    console.log("checkboxValue", this.checkboxValue)
    if (!this.checkboxValue) {

      if (!isNaN(this.min) && !isNaN(this.max) && this.min < this.max) {

        this.productService.priceFilter(this.min, this.max).subscribe((data => {
          this.result = data;
          this.result = this.result.responseData
        }))
      }
      else {
        Swal.fire({
          title: 'Invalid Range',
          text: 'Pease check min and max range or  range inputs ',
          icon: 'error', // Set the icon (info, success, error, warning, question)
          showConfirmButton: false, // Hide the default confirmation button
          timer: 3000 // Auto-close the alert after 3000 milliseconds (3 seconds)
        });
      }
    }

    else {

      console.log(" in else block  min and max is ", this.min, this.max)
      if (!isNaN(this.min) && !isNaN(this.max) && this.min < this.max) {
        this.productService.getSearchProductsInRange(this.data, this.min, this.max).subscribe((Response) => {
          this.result = Response.responseData
        })

      }
      else {
        Swal.fire({
          title: 'Invalid Range',
          text: 'Pease check min and max range or  range inputs ',
          icon: 'error', // Set the icon (info, success, error, warning, question)
          showConfirmButton: false, // Hide the default confirmation button
          timer: 3000 // Auto-close the alert after 3000 milliseconds (3 seconds)
        });
      }

    }

  }















}
