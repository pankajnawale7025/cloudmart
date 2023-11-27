import { Component } from '@angular/core';
import { Product } from 'src/app/core/model/Product';
import { ProductsService } from 'src/app/core/services/products.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent {

  addProductTableDiv: boolean = false;
  addedmsg: boolean = false;
  response: any;
  product: Product = new Product();
  totalPagesarray: any[] = [1, 2, 3];
  pageSize = 5;
  totalPages: any;
  no = 0;
  showProductTable: boolean = false;
  showupdateform: boolean = false;
  responseForUpdate: any;
  dropdownData: any[] = ["Select", "Grocery", "Electronics","Home applience","Sport","Clothes"];


  constructor(private productService: ProductsService) { }

  addProduct() {
    this.showProductTable = this.showProductTable == true ? false : false;
    this.addProductTableDiv = this.addProductTableDiv == true ? false : true;
  }
  addProductInDatabase() {
    console.log(this.product);
      if(this.product.category!=null && this.product.category!="Select")
{  this.productService.addProduct(this.product).subscribe((data => {
    this.addedmsg = true;
  }));
}
else
{
  Swal.fire("Please Select Valid Category")
  
}



  }



  viewAllProduct() {
    this.showProductTable = this.showProductTable == true ? false : true;
    this.addProductTableDiv = false;
    this.productService.allProduct().subscribe((data => {
      this.response = data;
      this.response = this.response;
      console.log(this.response);
    }));
  }

  ascOrder(columnname: string) {
    console.log(columnname);
    console.log(this.response.responseData.content);

    if (Array.isArray(this.response.responseData.content)) {
      this.response.responseData.content = this.response.responseData.content.sort((a: any, b: any) => {
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

      console.log(this.response.responseData.content);
    } else {
      console.error('content is not an array or does not exist.');
    }
  }

  descOrder(columnname: string) {

    console.log(columnname);
    console.log(this.response.responseData.content);

    if (Array.isArray(this.response.responseData.content)) {
      this.response.responseData.content = this.response.responseData.content.sort((a: any, b: any) => {
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

      console.log(this.response.responseData.content);
    } else {
      console.error('content is not an array or does not exist.');
    }
  }
  getPageWiseProduct(no: number, pagesize: number): void {
    this.productService.getSpecificProduct(no, this.pageSize).subscribe((data) => {
      console.log(no);
      this.response = data;
      this.totalPages = this.response.responseData.totalPages;
      this.totalPagesarray = new Array(this.totalPages);
      console.log(this.response.responseData.content);

    });
  }

  onPageSizeBtnClick(event: any) {
    this.pageSize = event.target.value;
    this.productService.getSpecificProduct(this.no, this.pageSize).subscribe((data) => {
      console.log(this.no);
      this.response = data;
      this.totalPages = this.response.responseData.totalPages;
      this.totalPagesarray = new Array(this.totalPages);
      console.log(this.response.responseData.content);

    });
    console.log(this.pageSize);
  }

  public deleteProduct(data: any): void {
    // console.log(data)
    this.product.id = data.id;
    this.product.name = data.name;
    this.product.category = data.category;
    this.product.price = data.price;
    console.log("Product deleted Sucessfully");
    this.productService.deleteProduct(this.product).subscribe((data1) => {
      this.response = data1;
      console.log(this.response);
    },

      error => {
        console.log("At Error messsage");
        this.response = error.error;

        if (!error.error.success) {
          alert("Product is in customer order so it Cannot delet");
        }
        console.log(" error.error is ", error.error.success);
      });
    this.viewAllProduct();
    this.viewAllProduct();
  }

  updatePro() {

    console.log("Product is :", this.product);
    this.productService.updateProduct(this.product).subscribe((data1) => {

      this.responseForUpdate = data1;
      console.log("this.responseForUpdate", this.responseForUpdate);

      // data1 is sucess method
      this.responseForUpdate.isSuccess = data1.success;
      //  console.log(this.response.responseData)
      //  console.log(this.response.errorMessage)
      //  console.log(this.response.isSuccess)
      //   console.log('data 1 is ',data1)
      //   console.log('this.response.isSuccess=data1.isSuccess;', this.response.isSuccess);
      //   console.log('Data1 is sucess:', data1.isSuccess);
      //  console.log('this.response:', this.response);
    },
      error => {
        console.log("At Error messsage");
        this.responseForUpdate = error.error;


      }
    );
  }
  updateProduct(data: any) {
    this.showupdateform = true;
    console.log("this.showupdateform", this.showupdateform);
    this.product.id = data.id;
    this.product.name = data.name;
    this.product.category = data.category;
    this.product.price = data.price;
    this.product.imageurl = data.imageurl;
  }


  downloadExcelFile() {

    this.productService.downloadExcel().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'product_data.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  private minId: number = 0;
  private maxID: number = 0;
  range: string;

  downloadExcelFileRange() {
    if (this.isPatternValid(this.range)) {
      const parts = this.range.split("-");

      if (parts.length === 2) {
        this.minId = parseInt(parts[0], 10);
        this.maxID = parseInt(parts[1], 10);
      }


      this.productService.downloadExcelRange(this.minId, this.maxID).subscribe((data: Blob) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'product_data.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });

      console.log("valid input");
    }
    else {
      alert("Insert valid data ");

    }
  }
  isPatternValid(input: string): boolean {
    const pattern = /^\d+-\d+$/; // Regular expression pattern for number-number


    // Use the test method to check if the input matches the pattern
    return pattern.test(input);
  }



  selectCategory(selectCategory: any) {
    //console.log(selectCategory.target.value)



if(selectCategory.target.value=="Select")
{
  
  Swal.fire("Please Select Valid Category")
  console.log("valid input");
  this.product.category = selectCategory.target.value
}

else{
  this.product.category = selectCategory.target.value
      console.log( " this.product.category===>",this.product.category)
}
  }



}
