import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../model/Object-model';
import { environment } from 'src/environment/environment ';
import { Product } from '../model/Product';
@Injectable({
  providedIn: 'root'
})
    export class ProductsService {
  constructor(private http: HttpClient) { }
    
  private readonly BASE_URL:string=   environment.productUrl;  
  private readonly CATEGORY_BASE_URL:string=   environment.categoryUrl;  

  allProduct():Observable<Response>
  {
    return this.http.get<Response>(this.BASE_URL+'getAllProduct')
  }
  
  getSpecificProduct(pageNumber:number,pageSize:number) :Observable<Response>{

    const params=new HttpParams()
    .set('pageNumber', pageNumber)
    .set('pageSize', pageSize)
    return this.http.get<Response>(this.BASE_URL+'getAllProduct',{params});

  }


productList():Observable<Response>{
  return this.http.get<Response>(this.BASE_URL+'allProduct')
}


getProductById(productId:number) :Observable<Response>{

   const params=new HttpParams()
  .set('productId', productId)
  return this.http.get<Response>(this.BASE_URL+'findProduct',{params});

}

getSpeciProduct(pageNumber:number) :Observable<Response>{
  return this.http.get<Response>(this.BASE_URL+'getAllProduct',{params: new HttpParams()
   .set('pageNumber', pageNumber)
   .set('pageSize', '5'),
});

}
deleteProduct(product:Product):Observable<Response>{
  return this.http.delete<Response>(this.BASE_URL+'deleteProduct',{ body: product});
}



addProduct(product:Product):Observable<Response>{
  return this.http.post<Response>(this.BASE_URL+'addProduct',product);
}
  


updateProduct(product:Product):Observable<Response>

{
  // console.log("data in productService==>"+product)
 return this.http.put<Response>(this.BASE_URL+'updateProduct',product)
}


downloadExcel(): Observable<Blob> {
  return this.http.get(this.BASE_URL + 'generateExcel', { responseType: 'blob' });
}

downloadExcelRange(minId:number,maxId:number): Observable<Blob> {
  const params=new HttpParams()
  .set('minId', minId)
  .set('maxId', maxId)
  return this.http.get(this.BASE_URL + 'generateExcelRange', { responseType: 'blob' , params: params  });
}



searchProducts(data:string) :Observable<Response>{
  const params=new HttpParams()
 .set('data', data)
 return this.http.get<Response>(this.BASE_URL+'getSearchProducts',{params});

}
priceFilter(min:number,max:number) :Observable<Response>{
  const params=new HttpParams()
 .set('min', min)
 .set('max', max)
 return this.http.get<Response>(this.BASE_URL+'priceFilter',{params});

}


listOfCategory() :Observable<Response>{
 return this.http.get<Response>(this.CATEGORY_BASE_URL+'listOfCategory');

}



}