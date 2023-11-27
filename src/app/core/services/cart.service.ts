import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/Object-model';
import { environment } from 'src/environment/environment ';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  private readonly BASE_URL: string = environment.cartServiceUrl

  addProductToCart(customerID: number, ProductId: number, productQuantity: number) {
    const requestBody = {
      customerID: customerID,
      ProductId: ProductId,
      ProductQuantity: productQuantity
    };
    return this.http.post<Response>(this.BASE_URL + 'addtocart', requestBody)
  }

  viewCartItem(customerId: number) {
    const params = new HttpParams()
      .set('customerId', customerId)
    return this.http.get<Response>(this.BASE_URL + 'viewcart', ({ params }))
  }
  
  

  


}
