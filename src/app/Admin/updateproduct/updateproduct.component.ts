import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data, error } from 'jquery';

import { Category } from 'src/app/core/model/Object-model';
import { Product } from 'src/app/core/model/Product';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductsService } from 'src/app/core/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrl: './updateproduct.component.css'
})
export class UpdateproductComponent implements OnInit {
  product: Product = new Product();
  dropdownData: Category[] = [];

  imageFile: File;
  selectedFile: File;
  category: Category;

  imageBase64string: string


  constructor(private categoryService: CategoryService, private router: Router, private productService: ProductsService, private aroute: ActivatedRoute,private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.productService.listOfCategory().subscribe((response) => {
      // console.log("Response is :", response)
      this.dropdownData = response.responseData
    }
    )
    this.aroute.queryParams.subscribe(params => {
      const productId = params['productId'];

      // console.log("this.productId is :", productId)
      this.productService.getProductById(productId).subscribe((data) => {
        this.product = data.responseData
        this.category = this.product.categoryInProduct;
           
        // console.log("this.category ===>",this.category) 

         let newarray= [ this.product.categoryInProduct,...this.dropdownData.filter(item => item.category !== this.category.category)];
    
         
         this.dropdownData=newarray
      
         console.log( "After edition ===>",this.dropdownData )  
        
      })
    })

    // console.log("Product is :", this.product);
    this.cdr.detectChanges();

  }


  selectCategory(selectedCategory: any) {
      console.log("selectedCategory.target.value==>",selectedCategory.target.value)
    // // console.log(this.dropdownData.find(category=>category.category_id===selectedCategory.target.value))
    let category1 = this.dropdownData.find((a) => a.category_id == selectedCategory.target.value);
    this.category = category1 ? category1 : { category_id: 0, category: '', googleMaterialIcon: '', productList: [] }
    this.product.categoryInProduct = this.category
    // console.log(this.category)
  }



  onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    // console.log("Filepath is ===>", event.target.files[0])
    // console.log("this.selectedFile", this.selectedFile)
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log("File data is ===>", e)
        // 'result' contains the contents of the file as a data URL
        const fileContent = e.target.result;
        // console.log("fileContent LENGTH IS  ===>", fileContent.length)
        this.imageBase64string = fileContent
        this.product.imageurl = fileContent
      };
      // Read the file as a data URL
      reader.readAsDataURL(this.selectedFile);
    }
  }

  backToManageProduct() {
    this.router.navigate(['viewproduct']);
  }
  updatePro() {
    console.log("hii")
    this.productService.updateProduct(this.product).subscribe((data)=>{
    
    
    console.log(data)
    },
    (error)=>{

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Some problem is there please truy after some time ",
        showConfirmButton: false,
        timer: 1000
      });
    })
  }

}
