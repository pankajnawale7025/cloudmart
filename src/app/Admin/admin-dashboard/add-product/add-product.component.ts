import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Category } from 'src/app/core/model/Object-model';
import { Product } from 'src/app/core/model/Product';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductsService } from 'src/app/core/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'addProduct',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductsService, private categoryService: CategoryService, private router: Router) { }

  product: Product =
    {

      "id": 0,
      "name": "Enter the product Name",
      "category": "",
      "price": 0,
      "imageurl": "",
      "categoryInProduct": {
        "category_id": 0,
        "category": "Electronics",
        "googleMaterialIcon": "laptop_mac",
        "productList": []
      },
      "discount": 0,
      "stockQuantity": 0
    }

  dropdownData: Category[] = [];
  imageSelected = false;
  imageFile: File;
  category: Category;

  addProductTableDiv = false
  ngOnInit(): void {

    this.addProductTableDiv = true
    this.productService.listOfCategory().subscribe((response) => {
      console.log("listOfCategory() op is ===>", response)
      this.dropdownData = response.responseData

      console.log("  Before  Sorting this.dropdownData is :", this.dropdownData)
      this.dropdownData.sort((a, b) => {
        const category_idA = a.category_id; // Ignore case for comparison
        const category_idB = b.category_id;
        if (category_idA < category_idB) { return -1; }
        if (category_idA > category_idB) { return 1; }
        return 0;
      });

      console.log("  A fter Sorting this.dropdownData is :", this.dropdownData[0])

      this.product.category = this.dropdownData[0].category

    },
      (error) => {
        Swal.fire("Some Problem is there")
      }
    )
  }



  selectCategory(selectedCategory: any) {
    console.log(selectedCategory.target.value)
    let category1 = this.dropdownData.find((a) => a.category_id == selectedCategory.target.value);
    this.category = category1 ? category1 : { category_id: 0, category: '', googleMaterialIcon: '', productList: [] }
    this.product.categoryInProduct = this.category
    console.log(this.category)
  }
  selectedFile: File;
  imageBase64string: string
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
  addProductInDatabase() {

    if (this.product.category = 'Electronics') {
      this.categoryService.getCategoryByName(this.product.category).subscribe((data) => {

        this.product.categoryInProduct = data.responseData
      })

    }
    console.log("Product is ===>", this.product)
    console.log("Product in   addProductInDatabase() is  ===>", this.product)

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

    }),
      (error) => {
        console.log(error)
        console.log(error.error.errorMessage)

        Swal.fire({
          position: "center",
          icon: "error",
          title: `Product is not saved }!`,
          showConfirmButton: false,
          timer: 1500
        });
      }

    );


  }
  backToManageProduct() {

    this.router.navigate(['admin-home/viewproduct']);
  }

}
