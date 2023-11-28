import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './customer/login/login.component';
import { HomeComponent } from './customer/home/home.component';
import { Product } from './core/model/Product';
import { ProComponent } from './customer/pro/pro.component';
import { NavbarComponent } from './customer/navbar/navbar.component';
import { CartComponent } from './customer/cart/cart.component';
import { OrderComponent } from './customer/order/order.component';
import { OrderhistoryComponent } from './customer/orderhistory/orderhistory.component';
import { ProductDetailsComponent } from './customer/product-details/product-details.component';
import { ProductsComponent } from './customer/products/ProductsComponent';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { OrderDetailsComponent } from './customer/order-details/order-details.component';
import { ManageProductComponent } from './Admin/admin-dashboard/manage-product/ManageProductComponent';
import { ManageAdminComponent } from './Admin/admin-dashboard/manage-admin/manage-admin.component';
import { ManageUserComponent } from './Admin/admin-dashboard/manage-user/manage-user.component';
import { PageNotFoundErrorComponent } from './shared/layouts/page-not-found-error/page-not-found-error.component';
import { SignupComponent } from './customer/signup/signup.component';
import { AboutComponent } from './customer/about/about.component';
import { FilterComponent } from './customer/filter/filter.component';
import { SearchComponent } from './customer/search/search.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: ProductsComponent },
  
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'productDetails', component: ProductDetailsComponent },
  { path: 'products', component: ProComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: ProductsComponent }, 
  { path: 'order', component: OrderComponent },
  { path: 'orderhistory', component: OrderhistoryComponent },
  { path: 'productsHome', component: ProductsComponent },
  { path: 'orderDetail', component: OrderDetailsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
 
  { path: 'Adminlogin', component: AdminDashboardComponent
, children:[
  { path: 'manageUser', component:ManageUserComponent },
  {path :"manageProduct", component:ManageProductComponent},
  {path :"manageAdmin", component:ManageAdminComponent},
]

}
  


  

  // {
  //     path: 'home', component: HomeComponent, children: [
  //     { path: '', component: NavbarComponent },
  //     { path: 'products', component: ProComponent },
  //     { path: 'cart', component: CartComponent },
  //     { path: 'order', component: OrderComponent },
  //     { path: 'orderhistory', component: OrderhistoryComponent}
  //   ]
  // }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
