import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/components/dashboard/dashboard.component";
import { LoginModule } from "./login/login.module";
import { CartComponent } from "./orders/components/cart/cart.component";
import { CheckoutComponent } from "./orders/components/checkout/checkout.component";
import { OrderCompleteComponent } from "./orders/components/order-complete/order-complete.component";
import { ProductDetailComponent } from "./products/components/product-detail/product-detail.component";
import { ProductListComponent } from "./products/components/product-list/product-list.component";
import { HomeComponent } from "./views/home/home.component";

const routes: Routes = [
	{
		path: "",
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
	},
	{
		path: "order-complete",
		component: OrderCompleteComponent,
	},
	{
		path: "dashboard",
		component: DashboardComponent,
	},
	{
		path: "login",
		component: LoginModule,
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
