import { HttpBackend } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserName: string = 'pankajnawale7025@gmail.com';
  password: string = '8806444288';
  errdiv: boolean = false;
  processbtn = false;
  private router = inject(Router);
  constructor(private cs: CustomerService, private navbarService: NavbarService) { }
  ngOnInit(): void {
    this.navbarService.home = true;

  }
  login(): void {


    if (this.UserName == 'Admin') {
      this.navbarService.signUp = false;
      this.router.navigate(['/Adminlogin'])
    }
    else {
      console.log('username is :', this.UserName)
      console.log('Password is :', this.password)

      this.cs.validateCustomer(this.UserName, this.password).subscribe((response => {
        console.log(response)
        this.processbtn = response?.success;
        console.log(this.processbtn)
        if (this.processbtn) {
          this.cs.getCustomer(this.UserName).subscribe((response) => {
            console.log('Response is :', response)
            this.cs.loggedInCustomer = response?.responseData;
            console.log('loggedInCustomer is :', this.cs.loggedInCustomer)
            localStorage.setItem('loggedInCustomer', JSON.stringify(this.cs.loggedInCustomer));

          })
          this.navbarService.signUp = false;
          this.navbarService.login = false;
          this.navbarService.cart = true;
          this.navbarService.orderHistrory = true;
          this.navbarService.logout = true;
          this.navbarService.about = true;


          Swal.fire({
            position: "center",
            icon: "success",

           title: `Welcome`,
           //title: `Welcome, ${this.dynamicString }!`,
            showConfirmButton: false,
            timer: 1500
          });




          console.log(localStorage.getItem("loggedInCustomer"));
          this.router.navigate(['/home']);
        }
        else {
          this.errdiv = true;
        }
      }))

    }
  }


  toSignUp() {
    this.router.navigate(['/signup'])

  }


}
