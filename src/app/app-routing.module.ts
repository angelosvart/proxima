import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/components/dashboard/dashboard.component";
import { CartComponent } from "./orders/components/cart/cart.component";
import { CheckoutComponent } from "./orders/components/checkout/checkout.component";
import { OrderCompleteComponent } from "./orders/components/order-complete/order-complete.component";
import { ProductDetailComponent } from "./products/components/product-detail/product-detail.component";
import { ProductListComponent } from "./products/components/product-list/product-list.component";
import { HomeComponent } from "./views/home/home.component";
import { DashboardProductComponent } from "./dashboard/components/dashboard-product/dashboard-product.component";
import { LoginComponent } from "./users/components/login/login.component";
import { AuthGuard } from "./users/services/auth-guard.service";
import { RegisterComponent } from "./users/components/register/register.component";
import { AccountComponent } from "./users/components/account/account.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "home",
		component: HomeComponent,
	},
	{
		path: "products",
		component: ProductListComponent,
	},
	{
		path: "products/:category",
		component: ProductListComponent,
	},
	{
		path: "product/:id",
		component: ProductDetailComponent,
	},
	{
		path: "cart",
		component: CartComponent,
	},
	{
		path: "checkout",
		component: CheckoutComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "order-complete",
		component: OrderCompleteComponent,
	},
	{
		path: "dashboard",
		canActivate: [AuthGuard],
		children: [
			{
				path: "",
				component: DashboardComponent,
			},
			{
				path: "product",
				component: DashboardProductComponent,
			},
			{
				path: "product/:id",
				component: DashboardProductComponent,
			},
		],
	},
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: "register",
		component: RegisterComponent,
	},
	{
		path: "account",
		canActivate: [AuthGuard],
		children: [
			{
				path: "",
				component: AccountComponent,
			},
		],
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
