import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { environment } from 'src/environment/environment ';
import { Observable } from 'rxjs';
import { Response } from '../model/Object-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  private readonly BASE_URL: string = environment.orderServiceUrl

  processOrder(customerId: number) {
    const params = new HttpParams()
      .set('customerId', customerId)
    return this.http.post<Response>(this.BASE_URL + 'processOrder', {}, ({ params }))
  }



  viewOrder(customerId: number):Observable<Response> {
    const params = new HttpParams()
      .set('customerId', customerId)
    return this.http.get<Response>(this.BASE_URL + 'viewAllOrder', ({ params }))
  }


  viewOrderByOrderId(orderId: number) {
    const params = new HttpParams()
      .set('orderId', orderId)
    return this.http.get<Response>(this.BASE_URL + 'viewOrderDetail', ({ params }))
  }


  sendEmail(customerId:number,orderId:number)
  {
   
    const params = new HttpParams()
    .set('customerId', customerId)
    .set('orderId',orderId)
  return this.http.get<Response>(this.BASE_URL + 'sendEmail', ({ params }))
  }



    
}
