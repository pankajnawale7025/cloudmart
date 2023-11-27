import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public storeItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
 
  public getItem(key: string): any  {
    return localStorage.getItem(key);
  }
 
  public removeItem(key:string){
    localStorage.removeItem(key)
  }
}
