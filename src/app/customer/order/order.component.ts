import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  constructor(private http: HttpClient, private cs: CustomerService, private orderService: OrderService,private router:Router  ) { }
 
 
 processorderresponse:any;
 OrderId:any;
  ngOnInit(): void {
    console.log(this.cs.loggedInCustomer.id)
    this.orderService.processOrder(this.cs.loggedInCustomer.id).subscribe((data => {
     
     this.processorderresponse=data
      console.log(this.cs.loggedInCustomer.id)
      console.log(data)
      this.OrderId=this.processorderresponse.responseData.id

      console.log(this.processorderresponse.success)
       if(this.processorderresponse.success)
{
  this.orderService.sendEmail(this.cs.loggedInCustomer.id,this.OrderId).subscribe((data)=>{
    console.log(Response)
  })
}


    }))
  }
    goToHome() {
      this.router.navigate(['home'])
    }

}
