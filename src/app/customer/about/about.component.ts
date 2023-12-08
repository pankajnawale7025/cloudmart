import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sortedIndexOf } from 'lodash';
import { Customer } from 'src/app/core/model/Object-model';
import { CustomerService } from 'src/app/core/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private customerService: CustomerService, private router: Router,private fb:FormBuilder) { }

  customer: Customer
  result: any;
  myForm: FormGroup;

  ngOnInit(): void {

    //this.customer = { ...this.customerService.loggedInCustomer };

    this.myForm = this.fb.group({
      name: [this.customerService.loggedInCustomer.name, [Validators.required,Validators.minLength(3)]],
      surName: [this.customerService.loggedInCustomer.surName],
      contactNumber: [this.customerService.loggedInCustomer.contactNumber, [Validators.required,Validators.pattern("^[0-9]{10}$")]],
      emailAddress: [this.customerService.loggedInCustomer.emailAddress, [Validators.required, Validators.pattern("^@?[A-Za-z0-9+_.-]+@?(.+)(com|In|biz)+$")]],
      address: [this.customerService.loggedInCustomer.address, [Validators.required,Validators.minLength(10)]]
    });
    
    //this.myForm.patchValue({ ...this.customerService.loggedInCustomer });
   console.log("this.customerService.loggedInCustomer===>",this.customerService.loggedInCustomer)
   console.log(" this.myForm==>", this.myForm)
    

  }
   f() {
    return this.myForm.controls;
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
                title: `We are facing some issue`,
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




}


