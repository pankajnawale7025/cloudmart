import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Customer } from 'src/app/core/model/Object-model';
import { CustomerService } from 'src/app/core/services/customer.service';
import Swal from 'sweetalert2';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { coerceStringArray } from '@angular/cdk/coercion';
import { ProductsService } from 'src/app/core/services/products.service';


@Component({
  selector: 'viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrl: './viewcustomer.component.css'
})
export class ViewcustomerComponent implements OnInit {

  dataSource: any;
  pageSizeOption: number[];
  data = [
    { name: 'John', age: 30, city: 'New York' }

  ];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(private router: Router, private customerService: CustomerService) {

  }


  displayedColumns: string[] = ['name', 'Surname', 'Contact Number', 'Email Address', 'Address', 'Orders', 'Update', "Delete"];
  ngOnInit(): void {


    this.customerService.viewAllCustomer().subscribe((response) => {
      console.log("response.responseData===>", response.responseData)
      this.data = response.responseData
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.paginator)
      this.dataSource.paginator = this.paginator;
      this.pageSizeOption = this.numberArray(response.responseData.length);
    },
      (error) => {

        Swal.fire("Problem is there")
      }
    )
  }
  AddCustomer() {
 
    this.router.navigate(['admin-home/adduser']);
  }

  numberArray(num: number): number[] {
    return Array(num + 1)  // create an array of length
      .fill(0) // fill elements with 0
      .map((el, i) => i) // provide an array consisting of index
      .filter((el) => el >= 5 && (el % 5 === 0 || el === num)) // include elements >= 5 and multiples of 5 or the last element
      .map((el, i, arr) => (i === arr.length - 1 && el % 5 !== 0) ? el : el); // add 5 to the last element if it's not a multiple of 5
  }


  updateCustomer(customerId: number) {
    
    console.log("customerId in up[dateCistomer is ===>",customerId)
    this.router.navigate(['about'], {
      queryParams: { customerId: customerId }
    })
  }
  deletCustomer(id:number)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(id).subscribe((data)=>{
       //   alert("customer deleted successfully")

       
       
    this.customerService.viewAllCustomer().subscribe((response) => {
      console.log("response.responseData===>", response.responseData)
      this.data = response.responseData
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.paginator)
      this.dataSource.paginator = this.paginator;
      this.pageSizeOption = this.numberArray(response.responseData.length);
    },
      (error) => {

        Swal.fire("Problem is there")
      }
    )
          })
        
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }


}
