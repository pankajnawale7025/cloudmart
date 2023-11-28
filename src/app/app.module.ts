import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { PageNotFoundErrorComponent } from './shared/layouts/page-not-found-error/page-not-found-error.component';
import { LoginComponent } from './customer/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './customer/home/home.component';
import { NavbarComponent } from './customer/navbar/navbar.component';
import { ProComponent } from './customer/pro/pro.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './customer/cart/cart.component';
import { OrderComponent } from './customer/order/order.component';
import { OrderhistoryComponent } from './customer/orderhistory/orderhistory.component';
import { ProductsComponent } from './customer/products/ProductsComponent';
import { ProductDetailsComponent } from './customer/product-details/product-details.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { OrderDetailsComponent } from './customer/order-details/order-details.component';
import { ManageProductComponent } from './Admin/admin-dashboard/manage-product/ManageProductComponent';
import { ManageUserComponent } from './Admin/admin-dashboard/manage-user/manage-user.component';
import { ManageAdminComponent } from './Admin/admin-dashboard/manage-admin/manage-admin.component';
import { SignupComponent } from './customer/signup/signup.component';
import { AboutComponent } from './customer/about/about.component';
import { FilterComponent } from './customer/filter/filter.component';
import { SearchComponent } from './customer/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundErrorComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProComponent,
    CartComponent,
    OrderComponent,
    OrderhistoryComponent,
    ProductsComponent,
    ProductDetailsComponent,
    AdminDashboardComponent,
    OrderDetailsComponent,
    ManageProductComponent,
    ManageUserComponent,
    ManageAdminComponent,
    SignupComponent,
    AboutComponent,
    FilterComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

   
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
