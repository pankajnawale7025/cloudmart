import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
 selector: 'adduser', 
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent {
  

  
constructor(private router:Router){}


backToManageProduct() {

  this.router.navigate(['/Adminlogin/manageUser']);
}




}
