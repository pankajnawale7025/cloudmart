import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment ';
import { Response } from '../model/Object-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService  {

  constructor(private http: HttpClient) { }
  private readonly BASE_URL: string = environment.categoryServiceUrl


  listOfCategory(): Observable<Response> {
    return this.http.get<Response>(this.BASE_URL + 'listOfCategory')
  }









}