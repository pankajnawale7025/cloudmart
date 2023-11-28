import { Product } from "./Product";

export class Customer {
     id: number;
     name: string;
     surName: string;
     contactNumber: string;
     emailAddress: string;
     address: string;
     
     customerOrderList:any;
     cart:any;
  
}

export class Response {
    success: boolean;
    errorMessage: string[];
      responseData: any; // You can replace 'any' with a specific type if you know the structure of 'Object'
      isSuccess: boolean;
    }



    export class Category {
      category_id: number;
      category: string;
      productList: Product[];
    
      constructor(category_id: number, category: string, productList: Product[]) {
        this.category_id = category_id;
        this.category = category;
        this.productList = productList;
      }
    }
    
    


