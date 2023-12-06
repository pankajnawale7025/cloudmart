import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class SignupComponent implements ComponentCanDeactive,OnInit {

  errmsgforadd:boolean=false;
  sccmsgforadd:boolean=false;
  response:any;
  response1:any;
  myForm: FormGroup;
constructor(private customerService:CustomerService,private router:Router,private fb:FormBuilder)
{}
  ngOnInit(): void {
     // Initialize the form with form controls and validators
     this.myForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3)]],
      surName: [''],
      contactNumber: ['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
      emailAddress: ['', [Validators.required, Validators.pattern("^@?[A-Za-z0-9+_.-]+@?(.+)(com|In|biz)+$")]],
      address: ['', [Validators.required,Validators.minLength(10)]]
    });
  }

customer=new Customer()
 isDirty=false;

  canDeactivate () : boolean {
  return  !this.isDirty;
  }
  get f() {
    return this.myForm.controls;
  }
  addCustomerInDatabase(){
    this.isDirty=false;


    this.customer.emailAddress=this.myForm.value.emailAddress


    this.customer=this.myForm.value
    console.log("this.myForm.value===>",this.myForm.value)
    console.log("this.customer===>",this.customer)
    
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
            

                          
          Swal.fire({
            position: "center",
            icon: "error",

            title: `Check Inputs..!`,
            //title: `Welcome, ${this.dynamicString }!`,
            showConfirmButton: false,
            timer: 1500
          });


      

                 
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

