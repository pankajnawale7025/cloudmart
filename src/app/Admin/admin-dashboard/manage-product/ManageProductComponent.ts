import { Component, provideZoneChangeDetection } from '@angular/core';
import { Router } from '@angular/router';
import { any } from 'list';
import { Category } from 'src/app/core/model/Object-model';
import { Product } from 'src/app/core/model/Product';
import { CategoryService } from 'src/app/core/services/category.service';
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
  dropdownData: Category[] = [];
  productList: Product[] = []
  imageSelected = false;
  imageBase64string: string;
  sizeOption: number[] = [1];
  selectedFile: File;

  constructor(private productService: ProductsService, private categoryService: CategoryService, private router: Router) { }



  onFileSelected(event: any): void {
    this.imageSelected = true;

    this.selectedFile = event.target.files[0];
    console.log("Filepath is ===>", event.target.files[0])
    console.log("this.selectedFile", this.selectedFile)
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log("File data is ===>", e)
        // 'result' contains the contents of the file as a data URL
        const fileContent = e.target.result;


        console.log("fileContent LENGTH IS  ===>", fileContent.length)
        this.imageBase64string = fileContent
        this.product.imageurl = fileContent
      };

      // Read the file as a data URL
      reader.readAsDataURL(this.selectedFile);
    }

  }



  addProduct() {


    this.router.navigate(['/addproduct']);


    this.showProductTable = this.showProductTable == true ? false : false;
    this.addProductTableDiv = this.addProductTableDiv == true ? false : true;
    this.imageSelected = false;



    this.productService.listOfCategory().subscribe((response) => {

      console.log("Response is :", response)
      this.dropdownData = response.responseData

      console.log("  Before  Sorting this.dropdownData is :", this.dropdownData)
      this.dropdownData.sort((a, b) => {
        const category_idA = a.category_id; // Ignore case for comparison
        const category_idB = b.category_id;
        if (category_idA < category_idB) {
          return -1; // a comes before b
        }
        if (category_idA > category_idB) {
          return 1; // a comes after b
        }
        return 0; // names are equal
      });

      console.log("  A  fter Sorting this.dropdownData is :", this.dropdownData[0])

      this.product.category = this.dropdownData[0].category

    }
    )
  }

  imageFile: File;
  dynamicString: string = "Error";
  addProductInDatabase() {

    if (this.product.categoryInProduct == undefined) {
      this.categoryService.getCategoryByName(this.product.category).subscribe((data) => {

        this.product.categoryInProduct = data.responseData
      })

    }

    console.log("Product is ===>", this.product)



    if (true) {
      this.productService.addProduct(this.product).subscribe((data => {
        console.log("add product in database -2")
        if (data.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product has been Added",
            showConfirmButton: false,
            timer: 1500
          });
        }
        this.addedmsg = true;
      }),
        (error) => {
          console.log(error)
          console.log(error.error.errorMessage)
          this.dynamicString = error.error.errorMessage

          Swal.fire({
            position: "center",
            icon: "error",
            //title: 'Product is not saved, ${this.dynamicString }!',
            title: `Product is not saved, ${this.dynamicString}!`,
            showConfirmButton: false,
            timer: 1500
          });
        }

      );
    }
    else {
      Swal.fire("Please Enter Valid Data")

    }
  }


  viewAllProduct() {

    this.router.navigate(['/viewproduct']);


    this.showProductTable = this.showProductTable == true ? false : true;
    this.addProductTableDiv = false;
    console.log("This product is ===>", this.product)
    this.productService.listOfCategory().subscribe((response) => {

      console.log("Response is :", response)
      this.dropdownData = response.responseData

      console.log("  Before  Sorting this.dropdownData is :", this.dropdownData)
      this.dropdownData.sort((a, b) => {
        const category_idA = a.category_id; // Ignore case for comparison
        const category_idB = b.category_id;
        if (category_idA < category_idB) {
          return -1; // a comes before b
        }
        if (category_idA > category_idB) {
          return 1; // a comes after b
        }
        return 0; // names are equal
      });

      console.log("  A  fter Sorting this.dropdownData is :", this.dropdownData[0])

      this.product.category = this.dropdownData[0].category

    })

    console.log("You are in view all product")
    this.productService.allProduct().subscribe((data => {
      console.log("allProduct() internal getproduct repsonse is  on init ==>", data)


   console.log("data.responseData.content.elements===>",data.responseData.elements)
      this.sizeOption = this.numberArray(data.responseData.totalElements)
      data.responseData.totalElements
      this.productList = data.responseData.content
      //console.log("view all=============================>", this.productList)
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
    console.log("getPageWiseProduct")
    this.no = no
    this.pageSize = 5
    this.productService.getSpecificProduct(no, this.pageSize).subscribe((data) => {
      console.log("data getSpecificProduct ======================================================================>", data);
      this.productList = data.responseData.content;
      this.totalPages = this.response.responseData.totalPages;

      this.totalPagesarray = new Array(this.totalPages);
      console.log(data);


      console.log("data.responseData.content.elements===>",data.responseData.content.elements)
      this.sizeOption=this.numberArray(data.responseData.content.elements)
      console.log("this.sizeOption===>",this.sizeOption)
    });
  }
  numberArray(num: number): number[] {
    return Array(num + 1)  // create a array of length
      .fill(0) // fille elements as 0
      .map((el, i) => i) // provide an array consisting of index
      .filter((el) => el >= 5 && el % 5 === 0); // return array including element > 5 and multiple of 5
  }

  onPageSizeBtnClick(event: any) {
    this.pageSize = event.target.value;
    this.productService.getSpecificProduct(this.no, this.pageSize).subscribe((data) => {
      console.log("data onPageSizeBtnClick ======================================================================>", data);


      console.log(" onPageSizeBtnClick productService.getSpecificProduct api op is ===>",data);
      this.productList = data.responseData.content;
       this.totalPages = data.responseData.totalPages;
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

    {
      this.categoryService.getCategoryByName("Electronics").subscribe((data) => {



        console.log("Category data is===>", data)
        this.product.categoryInProduct = data.responseData
      })

    }

  }
  updateProduct(data: any) {
    this.showupdateform = true;
    console.log("this.showupdateform", this.showupdateform);
    this.product.id = data.id;
    this.product.name = data.name;
    this.product.price = data.price;
    this.product.imageurl = data.imageurl;
    this.product.discount = data.discount;
    this.imageSelected = true
    this.product.categoryInProduct = data.categoryInProduct

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



  category: Category;

  selectCategory(selectedCategory: any) {
    console.log(selectedCategory.target.value)
    // console.log(this.dropdownData.find(category=>category.category_id===selectedCategory.target.value))
    let category1 = this.dropdownData.find((a) => a.category_id == selectedCategory.target.value);
    this.category = category1 ? category1 : { category_id: 0, category: '', googleMaterialIcon: '', productList: [] }



    this.product.categoryInProduct = this.category
    console.log(this.category)
    // if (selectedCategory.target.value == 1) {

    //   Swal.fire("Please Select Valid Category")
    //   console.log("valid input");

    // }

    // else{
    //   this.product.category = selectCategory.target.value
    //       console.log( " this.product.category===>",this.product.category)
    // }

  }



}
