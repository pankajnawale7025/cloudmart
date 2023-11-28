import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, Response } from '../model/Object-model';
import { Observable } from 'rxjs';
import { __param } from 'tslib';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment ';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  loggedInCustomer = new Customer();
  constructor(private http: HttpClient,private navbarService:NavbarService) { }


  private readonly BASE_URL: string = environment.customerServiceUrl


  validateCustomer(emailAddress: string, contactNumber: string): Observable<Response> {
    // Create an instance of HttpParams
    const params = new HttpParams()
      .set('emailAddress', emailAddress)
      .set('contactNumber', contactNumber);
    console.log('params is :', params)
    return this.http.get<Response>(this.BASE_URL + 'validateCustomer', ({ params }))
  }
  

  getCustomer(emailAddress: string): Observable<Response> {
    const params = new HttpParams()
      .set('emailAddress', emailAddress)
    return this.http.get<Response>(this.BASE_URL + 'getCustomer', ({ params }))
  }


validCustomer():boolean
{
  //console.log(this.loggedInCustomer.name);
return this.loggedInCustomer.name==undefined|| null?false:true
}



viewAllCustomer(): Observable<Response> {
  return this.http.get<Response>(this.BASE_URL + 'ViewAllCustomer',)

}
addCustomer(customer:Customer): Observable<Response> {
  console.log("In service customer is ",customer)
  return this.http.post<Response>(this.BASE_URL + 'addCustomer',customer)

}

deleteCustomer(customerId:number)
{
  const params = new HttpParams()
  .set('customerId', customerId)
  return this.http.delete<Response>(this.BASE_URL + 'deleteCustomerByid', ({ params }))
}

updateCustomer(customer:Customer): Observable<Response> {
  console.log("In service customer is ",customer)
  return this.http.put<Response>(this.BASE_URL + 'updateCustomer',customer)

}

isEmailNotPresent(emailAddress:string)
{
  const params = new HttpParams()
  .set('emailAddress', emailAddress)
  return this.http.get<Response>(this.BASE_URL + 'isEmailNotPresent',({ params }))

}
xyz = new Customer();
loogedOutCustomer()
{
  this.navbarService.logout=false;
  this.navbarService.login=true;
  this.navbarService.signUp=true;
  this.loggedInCustomer = this.xyz
  localStorage.removeItem('loggedInCustomer');
  this.navbarService.orderHistrory=false;
  this.navbarService.about=false;
  this.navbarService.cart=false;
}


}