import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LateralMenuComponent } from "./components/lateral-menu/lateral-menu.component";
import { ProductCardComponent } from './components/product-card/product-card.component';
import { StickyMenuComponent } from './components/sticky-menu/sticky-menu.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
	declarations: [DashboardComponent, LateralMenuComponent, ProductCardComponent, StickyMenuComponent, ProductComponent],
	imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
	exports: [DashboardComponent, LateralMenuComponent],
})
export class StoresModule {}
