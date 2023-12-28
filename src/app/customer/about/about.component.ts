import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { sortedIndexOf } from 'lodash';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/model/Object-model';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ComponentCanDeactive } from 'src/app/shared/component-can-deactive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, ComponentCanDeactive {

  constructor(private customerService: CustomerService, private router: Router,private aroute : ActivatedRoute) { }
  isDirty = false;
  customer: Customer
  result: any;
  myForm: FormGroup;


  canDeactivate(): boolean {
    return !this.isDirty;
  }

  ngOnInit(): void {


    console.log("this.customerService.loggedInCustomer =========>",this.customerService.loggedInCustomer.id )
    if (this.customerService.loggedInCustomer.id!=undefined)
    {
      
    this.customer = { ...this.customerService.loggedInCustomer };
  }
    
    else {
console.log("in else block ")
  
      this.aroute.queryParams.subscribe(params => {
        const customerId = params['customerId'];
console.log("customerId===>", customerId)

       console.log("customerId through activated route is ====>", customerId)
            
       this.customerService.getCustomerById(customerId).subscribe((response)=>{
        console.log("Response is ===> ",response)

        this.customer =response.responseData
        console.log("this.customer is ",this.customer)

       },
       (error=>{
        Swal.fire("We are facing some internal isssue")
       }))
      
      
      
      })
      console.log("hiii")


    }

  }

  dataVerification: boolean;
  updateCustomerInDatabase() {
    if (
      this.customer.id === this.customerService.loggedInCustomer.id &&
      this.customer.name === this.customerService.loggedInCustomer.name &&
      this.customer.surName === this.customerService.loggedInCustomer.surName &&
      this.customer.contactNumber === this.customerService.loggedInCustomer.contactNumber &&
      this.customer.emailAddress === this.customerService.loggedInCustomer.emailAddress &&
      this.customer.address === this.customerService.loggedInCustomer.address
    ) {

      Swal.fire({
        position: "center",
        icon: "question",
        title: `Sorry ! No Changes Found `,
        showConfirmButton: false,
        timer: 1500
      });

    }
    else {

      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          this.customerService.updateCustomer(this.customer).subscribe((data) => {


            localStorage.setItem('loggedInCustomer', JSON.stringify(data.responseData))

            this.customer = { ...data.responseData };
            this.customerService.loggedInCustomer = data.responseData

            //    console.log("data.responseDatais ===>", data.responseData)
            //   console.log("this.customerService.loggedInCustomer is ===>", this.customerService.loggedInCustomer)
            if (data.success) {


              Swal.fire({

                position: "center",
                icon: "success",
                title: `Profile updated successfully`,
                showConfirmButton: false,
                timer: 1000

              })

            }


          },
            (error) => {
              Swal.fire({

                position: "center",
                icon: "error",
                title: `Please cheack inputs  
                `,
                showConfirmButton: false,
                timer: 1000

              })
            }
          )





        } else if (result.isDenied) {
          this.customer = { ...this.customerService.loggedInCustomer };
          Swal.fire("Changes are not saved", "", "info");
        }
        else if (result.isDismissed) {
          this.customer = { ...this.customerService.loggedInCustomer };
          //  console.log("User clicked on cancel button");
        }
      });
    }
  }




  deleteCustomerProfile() {
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

        this.customerService.deleteCustomer(this.customerService.loggedInCustomer.id).subscribe((data) => {

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

  backToManageProduct() {

    if(this.customerService.loggedInCustomer.id==undefined)
{
  this.router.navigate(['/admin-home/viewcustomer']);

}
  else
  {
    this.router.navigate(['home']);

  }
  }


}


