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



customer: Customer = {
  id:1,
  name: "xyz",
  surName: "xyz",
  contactNumber: "xyz",
  emailAddress: "xyz",
  address: "xyz",
  
  customerOrderList:"xyz",
  cart:"xyz"

};
result:any;
ngOnInit(): void {
  
//console.log("login customerobject in customer Service ====>",this.customerService.loggedInCustomer)

// create shallow copy to otherwise two instances will point to the same memory address by below first commiirting line 
//this.customer=this.customerService.loggedInCustomer;
 this.customer = { ...this.customerService.loggedInCustomer };


    // this.customerService.getCustomer(this.customerService.loggedInCustomer.emailAddress).subscribe((data)=>{
    //   this.result=data;
    //   this.customer=this.result.responseData
    //   console.log("login customer at in about component OnInit====>",this.customer)
    // })
  }

 dataVerification:boolean;













  updateCustomerInDatabase(){

console.log("Updated  Customer===>",this.customer)
console.log("Customer in Service ===>",this.customerService.loggedInCustomer)

   



if (
  this.customer.id === this.customerService.loggedInCustomer.id &&
  this.customer.name === this.customerService.loggedInCustomer.name &&
  this.customer.surName === this.customerService.loggedInCustomer.surName &&
  this.customer.contactNumber === this.customerService.loggedInCustomer.contactNumber &&
  this.customer.emailAddress === this.customerService.loggedInCustomer.emailAddress &&
  this.customer.address === this.customerService.loggedInCustomer.address 
) 



{

   
  Swal.fire({
    position: "center",
    icon: "question",
    title: `Sorry ! No Changes Found `,
    showConfirmButton: false,
    timer: 1500
  });
  //console.log("same");
} else {
  console.log("Different");
}
 // 96 to 133 update logic swal.fire not working according to it 


    // Swal.fire({
    //   title: 'Do you want to save the changes?',
    //   showDenyButton: true,
    //   // showCancelButton: true,
    //   confirmButtonText: 'Save',
    //   denyButtonText: `Don't save`,
    // }).then((result) => {
    //   console.log("in swalfire")
    //   this.customerService.updateCustomer(this.customer).subscribe((data)=>{
    //     console.log("data in update is" , data)
    //     this.ngOnInit()
    //         this.dataVerification=data.success 
                
    //         console.log("data is  while updating ===>",data)

    //           console.log("this.dataVerification ====>",this.dataVerification)
    //   })
  
    //   if(false)
    //   {
    //     if (result.isConfirmed) {
    //       Swal.fire('Saved!', '', 'success')
    //     } else if (result.isDenied) {
    //       Swal.fire('Changes are not saved', '', 'info')
    //     }
    //   }
    //   else
    //   {
    //     Swal.fire('Insert valid data')
    //   }
    // })
//   // this.customerService.updateCustomer(this.customer).subscribe((data)=>{
    //   //   console.log("data in update is" , data)
    //   // })
      // //  alert("Data updated")
    // // this.ngOnInit()
     
    // }


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
  function deepEqual(customer: Customer, loggedInCustomer: Customer) {
    throw new Error('Function not implemented.');
  }

