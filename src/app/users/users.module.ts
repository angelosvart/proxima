import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { AccountComponent } from "./components/account/account.component";
import { LateralMenuComponent } from "./components/lateral-menu/lateral-menu.component";
import { OrdersComponent } from './components/orders/orders.component';
import { OrderItemComponent } from './components/order-item/order-item.component';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		AccountComponent,
		LateralMenuComponent,
  OrdersComponent,
  OrderItemComponent,
	],
	imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
})
export class LoginModule {}
