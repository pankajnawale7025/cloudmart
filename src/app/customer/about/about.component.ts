import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/core/model/Object-model';
import { CustomerService } from 'src/app/core/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent  implements OnInit{

constructor(private customerService:CustomerService,private router:Router ){}



customer =new Customer();
result:any;
ngOnInit(): void {
  
    this.customerService.getCustomer(this.customerService.loggedInCustomer.emailAddress).subscribe((data)=>{
      this.result=data;
      this.customer=this.result.responseData
    })

  console.log()
  
  }



 dataVerification:boolean;

  updateCustomerInDatabase(){

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      console.log("in swalfire")
      this.customerService.updateCustomer(this.customer).subscribe((data)=>{
        console.log("data in update is" , data)
        this.ngOnInit()
            this.dataVerification=data.success 
                
            console.log("data is  while updating ===>",data)

              console.log("this.dataVerification ====>",this.dataVerification)
      })
  
      if(false)
      {
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      }
      else
      {
        Swal.fire('Insert valid data')
      }
    })






      // this.customerService.updateCustomer(this.customer).subscribe((data)=>{
      //   console.log("data in update is" , data)
      // })
     
    //  alert("Data updated")
    // this.ngOnInit()
     
    }
    deleteCustomerProfile(){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete profile!'
      }).then((result) => {
        if (result.isConfirmed) {

          this.customerService.deleteCustomer(this.customerService.loggedInCustomer.id).subscribe((data)=>{
            console.log(data)
          })
          Swal.fire(
            'Deleted!',
            'Your profile has been deleted.',
            'success'
          )
          this.customerService.loogedOutCustomer()
      this.router.navigate(['signup'])
          
        }
      })

    }




}
