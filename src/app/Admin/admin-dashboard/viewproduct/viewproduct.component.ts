import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Product } from 'src/app/core/model/Product';
import { ProductsService } from 'src/app/core/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'viewproduct',

  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.css'
})
export class ViewproductComponent implements OnInit {
  currentPageSize: number = 5;
  sizeOption: any;
totalElements:number=5;

  currentPageNumber: number = 1;


  constructor(private productService: ProductsService, private router: Router) { }


  productList: Product[] = []
  totalPagesarray: number[] = []
  ngOnInit(): void {
    this.productService.allProduct().subscribe((data => {
      this.productList = [...data.responseData.content]
  this.totalElements=data.responseData.totalElements;
console.log("this.totalElements===>",this.totalElements)
      this.totalPagesarray = new Array(data.responseData.totalPages)
      console.log(this.productList)

      console.log("allProduct() internal getproduct repsonse is  on init ==>", data)
    }));
  }

  backToManageProduct() {
    console.log("hii")
    this.router.navigate(['/Adminlogin/manageProduct']);
  }


  deleteProduct(item: Product) {

  }
  updateProduct(item: Product) {

  }
  ascOrder(name: any) {

  }
  descOrder(name: any) {

  }
  getPageWiseProduct(sa: number, a: number) {

  }
  onPageSizeBtnClick(event: Event) {

  }


  previousPage() {
    if (this.currentPageNumber <= 1) {
      Swal.fire("you are on first Page")
    }
    else {
      this.currentPageNumber = this.currentPageNumber - 1;
      console.log(this.currentPageNumber)
    }
  }
     nextPage() {
       this.currentPageNumber = this.currentPageNumber + 1;
       console.log(this.currentPageNumber)
 }

 setManualPageNumber(event:Event){
if(isNaN(this.currentPageNumber))
{
  Swal.fire("PageNumber shoud be in number")
  this.currentPageNumber=1;
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
