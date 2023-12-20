import { coerceStringArray } from '@angular/cdk/coercion';
import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/model/Product';
import { ProductsService } from 'src/app/core/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'Viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.css'
})
export class ViewproductComponent implements OnInit {
  currentPageSize: number = 5;
  sizeOption: any;
  totalElements: number = 5;
  selectedPageSize: number = 5;
  currentPageNumber: number = 1;
  totalPages: number;
  searchTerm: string = '';

  constructor(private productService: ProductsService, private router: Router) { }


  filteredProducts: Product[] = []
  productList: Product[] = []
  totalPagesarray: number[] = []
  ngOnInit(): void {
    this.productService.allProduct().subscribe((data => {
      this.productList = [...data.responseData.content]
      this.totalElements = data.responseData.totalElements;
      console.log("this.totalElements===>", this.totalElements)
      this.totalPagesarray = new Array(data.responseData.totalPages)
      console.log(this.productList)
      this.totalPages = data.responseData.totalPages

      console.log("allProduct() internal getproduct repsonse is  on init ==>", data)
    }));
  }

  backToManageProduct() {
    console.log("hii")
    this.router.navigate(['/Adminlogin/manageProduct']);
  }


  deleteProduct(item: Product) {
    this.productService.deleteProduct(item).subscribe((data1) => {
     if(data1.success) 
     {
      

      this.productService.getSpecificProduct(this.currentPageNumber - 1, this.selectedPageSize).subscribe((data) => {
        console.log("this.filteredProducts =======>", data.responseData.contents)
        this.productList = data.responseData.content
        this.totalPages = data.responseData.totalPages

      });

     }
    },

      error => {
        console.log(" error.error is ", error.error.success);
      });

  }
  updateProduct(item: any) {
    this.router.navigate(['/updateproduct'],
    {
      queryParams: { productId: item.id }
    })

  }
  
  ascOrder(columnname: string) {


    if (Array.isArray(this.productList)) {
      this.productList = this.productList.sort((a: any, b: any) => {
        const columnA = a[columnname];
        const columnB = b[columnname];

        if (columnA > columnB) {
          return 1; // Sort in descending order
        } else if (columnA < columnB) {
          return -1; // Sort in descending order
        } else {
          return 0; // No change in order
        }
      });

      console.log("this.productList",);
    } else {
      console.error('content is not an array or does not exist.');
    }

  }


  descOrder(columnname: string) {

    console.log(columnname);
    console.log(this.productList);

    if (Array.isArray(this.productList)) {
      this.productList = this.productList.sort((a: any, b: any) => {
        const columnA = a[columnname];
        const columnB = b[columnname];

        if (columnA < columnB) {
          return 1; // Sort in descending order
        } else if (columnA > columnB) {
          return -1; // Sort in descending order
        } else {
          return 0; // No change in order
        }
      });

      console.log(this.productList);
    } else {
      console.error('content is not an array or does not exist.');
    }
  }

  isBlank(value: any): boolean {
    return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
  }
  onSearchChange(): void {
    console.log('Search term changed:', this.searchTerm);

    if (!this.isBlank(this.searchTerm)) {

      this.filteredProducts = this.productList.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.categoryInProduct.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.price.toString().includes(this.searchTerm)
      );

      console.log("this.filteredProducts =======>", this.filteredProducts)
      this.productList = this.filteredProducts
    }
    else {

      this.productService.getSpecificProduct(this.currentPageNumber - 1, this.selectedPageSize).subscribe((data) => {
        console.log("this.filteredProducts =======>", data.responseData.contents)
        this.productList = data.responseData.content
        this.totalPages = data.responseData.totalPages

      });
    }

  }
  onPageSizeBtnClick(event: Event) {

    console.log(this.selectedPageSize)
    this.productService.getSpecificProduct(0, this.selectedPageSize).subscribe((data) => {
      this.productList = data.responseData.content
      this.totalPages = data.responseData.totalPages
      this.currentPageNumber = 1
    });

  }


  previousPage() {
    if (this.currentPageNumber <= 1) {
      Swal.fire("you are on first Page")
    }
    else {
      this.currentPageNumber = this.currentPageNumber - 1;
      console.log(this.currentPageNumber)
      this.productService.getSpecificProduct(this.currentPageNumber - 1, this.selectedPageSize).subscribe((data) => {
        this.productList = data.responseData.content
      });

    }
  }
  nextPage() {
    if (this.totalPages > this.currentPageNumber) {
      this.currentPageNumber = this.currentPageNumber + 1;
      console.log(this.currentPageNumber)
      this.productService.getSpecificProduct(this.currentPageNumber - 1, this.selectedPageSize).subscribe((data) => {
        this.productList = data.responseData.content
      });
    }
    else {
      //Swal.fire("last page is " + this.totalPages)
      Swal.fire({
        title: "last page is " + this.totalPages,
        text: 'Your message here',
        timer: 1000, // Set the timeout in milliseconds (e.g., 3000 for 3 seconds)
        showConfirmButton: false, // Hide the confirmation button
        icon: 'error', // Set the icon type (success, error, warning, info)
      });

    }

  }

  setManualPageNumber(event: Event) {
    console.log("hii")
    if (isNaN(this.currentPageNumber)) {
      Swal.fire("PageNumber shoud be in number")
      this.currentPageNumber = 1;
    }
    else {
      if (this.totalPages > this.currentPageNumber) {
        this.productService.getSpecificProduct(this.currentPageNumber - 1, this.selectedPageSize).subscribe((data) => {
          this.productList = data.responseData.content
        });

      }
      else {
        Swal.fire({
          title: "last page is " + this.totalPages,
          text: 'Your message here',
          timer: 1000, // Set the timeout in milliseconds (e.g., 3000 for 3 seconds)
          showConfirmButton: false, // Hide the confirmation button
          icon: 'error', // Set the icon type (success, error, warning, info)
        });
      }

    }
  }

  LastPage() {
    console.log("hii")
    if (this.currentPageNumber == this.totalPages) {
      Swal.fire({
        title: " you already on last page",
        text: 'Your message here',
        timer: 1000, // Set the timeout in milliseconds (e.g., 3000 for 3 seconds)
        showConfirmButton: false, // Hide the confirmation button
        icon: 'error', // Set the icon type (success, error, warning, info)
      });

    }
    else {

      this.currentPageNumber = this.totalPages
      this.productService.getSpecificProduct(this.currentPageNumber - 1, this.selectedPageSize).subscribe((data) => {
        // console.log("data getSpecificProduct ======================================================================>", data)
        this.productList = data.responseData.content
      });
    }
  }

  numberArray(num: number): number[] {
    return Array(num + 1)  // create an array of length
      .fill(0) // fill elements with 0
      .map((el, i) => i) // provide an array consisting of index
      .filter((el) => el >= 5 && (el % 5 === 0 || el === num)) // include elements >= 5 and multiples of 5 or the last element
      .map((el, i, arr) => (i === arr.length - 1 && el % 5 !== 0) ? el : el); // add 5 to the last element if it's not a multiple of 5
  }

}
