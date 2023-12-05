import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/model/Object-model';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ComponentCanDeactive } from 'src/app/shared/component-can-deactive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements ComponentCanDeactive {

  errmsgforadd:boolean=false;
  sccmsgforadd:boolean=false;
  response:any;
  response1:any;
constructor(private customerService:CustomerService,private router:Router)
{}

customer=new Customer()
 isDirty=false;

  canDeactivate () : boolean {
  return  !this.isDirty;
  }

  addCustomerInDatabase(){
    this.customerService.isEmailNotPresent(this.customer.emailAddress).subscribe((data)=>{
    console.log("isEmailNotPresentOutput",data)
    this.response1=data
    console.log(this.response1.success)
     if(!this.response1.success)
      {
       Swal.fire("Email Address Already Registered Please  login");
         }
      else{


        this.customerService.addCustomer(this.customer).subscribe((data)=>{
      
        
            console.log( "data is ",data)
            this.response=data
            console.log("this.response.success :",this.response)
            
            if(this.response.success==false)
            {
            //  console.log("in if block  this.errmsgforadd and this.sccmsgforadd=false  is : ", this.errmsgforadd=true,this.sccmsgforadd=false)
            //  this.errmsgforadd=true;
            //  this.sccmsgforadd=false;
            Swal.fire("Please insert valid Inputs");  
          }
            else{
            Swal.fire('Profile created')
            this.router.navigate(["/login"])
           //   console.log("in  else  block  this.errmsgforadd and this.sccmsgforadd=false  is : ", this.errmsgforadd=true,this.sccmsgforadd=false)
              this.errmsgforadd=false;
              this.sccmsgforadd=true;
            }
          
            this.response=this.response.responseData
            console.log(this.response)
            
            },
            (error) => {
              // Handle HTTP errors here
              console.error("HTTP error:", error);
              // You can display an error message or perform other actions here
            }
      )
           
      }

    }) 

  }

toLogIn()
{
  this.router.navigate(["/login"])
}

}
function addCustomerInDatabase() {
  throw new Error('Function not implemented.');
}

