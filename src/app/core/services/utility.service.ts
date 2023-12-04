import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  // API url 
  baseApiUrl = "https://file.io"
    
  constructor(private http:HttpClient) { } 
  
  // Returns an observable 
  fileToByteArray(file:File) { 
  
 console.log("Hii")
  
}
}