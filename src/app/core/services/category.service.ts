import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment ';
import { Response } from '../model/Object-model';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class CategoryService  {

  constructor(private http: HttpClient) { }
  private readonly BASE_URL: string = environment.categoryServiceUrl


  listOfCategory(): Observable<Response> {
    return this.http.get<Response>(this.BASE_URL + 'listOfCategory')
  }




  getCategoryByName (category:string): Observable<Response> {

    const params = new HttpParams()
    .set('category', category)

    return this.http.get<Response>(this.BASE_URL + 'getCategoryByName',{params})
  }









}