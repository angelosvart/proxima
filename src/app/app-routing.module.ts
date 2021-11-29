import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginModule } from "./login/login.module";
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
		path: "login",
		component: LoginModule,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
