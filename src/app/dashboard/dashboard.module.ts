import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LateralMenuComponent } from "./components/lateral-menu/lateral-menu.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { StickyMenuComponent } from "./components/sticky-menu/sticky-menu.component";
import { DashboardProductComponent } from "./components/dashboard-product/dashboard-product.component";
import { DashboardAccountComponent } from "./components/dashboard-account/dashboard-account.component";

@NgModule({
	declarations: [
		DashboardComponent,
		LateralMenuComponent,
		ProductCardComponent,
		StickyMenuComponent,
		DashboardProductComponent,
		DashboardAccountComponent,
	],
	imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
})
export class DashboardModule {}
