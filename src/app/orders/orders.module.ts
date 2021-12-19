import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CartComponent } from "./components/cart/cart.component";
import { AppState } from "../app.reducer";
import { Store } from "@ngrx/store";
import { getCart } from "./actions/cart.actions";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { OrderCompleteComponent } from "./components/order-complete/order-complete.component";

@NgModule({
	declarations: [CartComponent, CheckoutComponent, OrderCompleteComponent],
	imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
	exports: [CartComponent, CheckoutComponent, OrderCompleteComponent],
})
export class OrdersModule {
	constructor(private store: Store<AppState>) {
		this.store.dispatch(getCart());
	}
}
