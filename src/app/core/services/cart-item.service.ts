import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment ';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  constructor(private http:HttpClient) { }
    private readonly BASE_URL: string = environment.cartItemsServiceUrl;


  
  deleteFromCart(cartItemID:number)
  {
    const params = new HttpParams()
    .set('cartItemID', cartItemID)
    return this.http.delete<Response>(this.BASE_URL + 'deleteCartItem', ({ params }))
   } 


    


       

}
