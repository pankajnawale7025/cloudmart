import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  

  constructor(private aroute:ActivatedRoute,private route:Router,private orderService:OrderService){}
  
 
  orderDetail:any
  productdetails:any
  finalTotalPrice:number;
  
  ngOnInit(): void {
  
    this.aroute.queryParams.subscribe(params => {
      const param1 = params['param1'];

 console.log("value of param through routing is ",param1)

          this.orderService.viewOrderByOrderId(param1).subscribe((data)=>{
            this.orderDetail=data;

            this.finalTotalPrice=(this.orderDetail.responseData.finalTotalPrice).toFixed(2)
            console.log("OrderDetail is ",this.orderDetail)
            this.productdetails=this.orderDetail.responseData.orderitemList
            console.log("this.productdetails is : ",this.productdetails)
          })
  
        })

}

productDetails(productId:number){}
toOrderHistory(){
  this.route.navigate(['orderhistory'])
}
}