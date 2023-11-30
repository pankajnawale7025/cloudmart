import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerService } from 'src/app/core/services/customer.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  response: any;
  productdetailsdiv: boolean = false;
  constructor(private co: OrderService, private cs: CustomerService, private route: Router) { }
  
  orderList:any;
  
  showerrmsg:boolean=false;

  ngOnInit(): void {

    this.co.viewOrder(this.cs.loggedInCustomer.id).subscribe((data) => {
      this.response = data;
      this.response = this.response .responseData.slice().reverse();;
      
      this.response?.responseData
      if(data.responseData.length==0)
{
       this.showerrmsg=true;
}
     // console.log("orderList is :",this.response[0].orderitemList[0].product.imageurl)
    })

  }
    OrderDetails(orderitemList: []) {
    //console.log(orderitemList)
    this.route.navigate(['orderDetail'], {
      queryParams: { param1: orderitemList }
    });


  }
  toHome(){
    this.route.navigate(['home'])

    
  }
}
