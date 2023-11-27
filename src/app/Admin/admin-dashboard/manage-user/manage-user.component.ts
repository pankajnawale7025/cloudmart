import { Component } from '@angular/core';
import { Customer } from 'src/app/core/model/Object-model';
import { CustomerService } from 'src/app/core/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {
  adct: boolean = false;
  vct: boolean = false;
  response: any;
  errmsgforadd:boolean=false;
 sccmsgforadd:boolean=false;
 upct:boolean=false;

  constructor(private customerService: CustomerService) { }
  addCustomer(): void {
    this.vct=false
    console.log(this.adct)
    this.adct = this.adct == true ? false : true;
  }


customer=new Customer()

addCustomerInDatabase()
{

this.customerService.addCustomer(this.customer).subscribe((data=>{
console.log( "data is ",data)

this.response=data
console.log("this.response.success :",this.response.success)

if(this.response.success==false)
{
  this.errmsgforadd=true;
  this.sccmsgforadd=false;
}
else{
  this.sccmsgforadd=true;
  this.errmsgforadd=false;
}


this.response=this.response.responseData
console.log(this.response)

}))

  console.log("customer is :", this.customer)
}


  viewCustomer(): void {
    this.vct = this.vct == true ? false : true;
      this.adct=false


    this.customerService.viewAllCustomer().subscribe((data) => {
      this.response = data
      this.response=this.response.responseData
      console.log(this.response)
    })
  }
  deleteUser(item: any) {







Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    this.customerService.deleteCustomer(item.id).subscribe((data)=>{
   //   alert("customer deleted successfully")
     this.viewCustomer();
     this.viewCustomer();
      })
    
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
})





  //   this.customerService.deleteCustomer(item.id).subscribe((data)=>{
  //   alert("customer deleted successfully")
  //  this.viewCustomer();
  //  this.viewCustomer();
  //   })
  }
  updateUser(item: any)
  {
    this.customer=item
    this.upct=this.upct==true?false:true
  }
  
  updateCustomerInDatabase(){
    
    this.upct=this.upct==true?false:true
      this.customerService.updateCustomer(this.customer).subscribe((data)=>{
        console.log("data in update is" , data)
      })
      this.upct=false;
      alert("Customer is updated")
      this.viewCustomer();
      this.viewCustomer();
    }

}