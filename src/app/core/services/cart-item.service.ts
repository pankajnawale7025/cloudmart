import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment ';
import { Customer } from '../model/Object-model';
import { Response } from '../model/Object-model';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  constructor(private http: HttpClient) { }
  private readonly BASE_URL: string = environment.cartItemsServiceUrl;



  deleteFromCart(cartItemID: number) {
    const params = new HttpParams()
      .set('cartItemID', cartItemID)
    return this.http.delete<Response>(this.BASE_URL + 'deleteCartItem', ({ params }))
  }



  getCartitemsNumbers(customer: Customer): Observable<Response> {
  //  console.log("In the  fetcartitemnumber===>",customer)
    // console.log("data in productService==>"+product)
    return this.http.post<Response>('http://localhost:8081/cart/getCartitemsNumbers', customer)
  }



  getCartItemCount(customerId: number): Observable<Response> {
   //console.log("getCartItemCount methid cartitemservice  customerId===>",customerId)
    const params = new HttpParams()
    .set('customerId', customerId)
    
        return this.http.get<Response>(this.BASE_URL+'getCartItemCount',  ({ params }))
  }




}
