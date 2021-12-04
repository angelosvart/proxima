import { Component, OnDestroy, OnInit } from "@angular/core";
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { getProducts } from "src/app/products/actions/products.actions";
import { deleteFromCart } from "../../actions/cart.actions";
import { getDeliveryMethods } from "../../actions/deliveryMethods.actions";
import { createOrder } from "../../actions/order.actions";
import { getPaymentMethods } from "../../actions/paymentMethods.actions";
import { CartItem } from "../../models/CartItem";
import { DeliveryMethod } from "../../models/DeliveryMethod";
import { Order } from "../../models/Order";
import { PaymentMethod } from "../../models/PaymentMethod";

@Component({
	selector: "app-checkout",
	templateUrl: "./checkout.component.html",
	styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit, OnDestroy {
	//TODO user states
	public userId: string = "6185527cef2a6aca4d36d191";

	public cart: CartItem[];
	public products: any[] = [];
	public productIds: string[] = [];
	public cartCount: number;
	public subTotal: number;
	public deliveryFee: number = 0;
	public error: boolean = false;
	public isOrderSuccess: boolean = false;
	public userPostCode: string;

	public checkoutForm: FormGroup;
	public name: FormControl;
	public surname: FormControl;
	public address: FormControl;
	public city: FormControl;
	public postCode: FormControl;
	public phone: FormControl;
	public deliveryMethod: FormControl;
	public paymentMethod: FormControl;

	public deliveryMethods: DeliveryMethod[];
	public paymentMethods: PaymentMethod[];

	private productsObservable: Subscription;
	private cartObservable: Subscription;
	private deliveryMethodsObservable: Subscription;
	private ordersObservable: Subscription;
	private paymentMethodsObservable: Subscription;

	constructor(
		private store: Store<AppState>,
		private titleService: Title,
		private router: Router
	) {}

	ngOnInit(): void {
		this.userPostCode = localStorage.getItem("postCode");

		this.cartObservable = this.store.select("cart").subscribe((response) => {
			this.cart = response?.cart;
			if (!this.cart.length && !this.isOrderSuccess) {
				this.router.navigate(["/cart"]);
			}
			this.cartCount = 0;
			this.subTotal = 0;
			response?.cart.forEach((item) => {
				this.cartCount = this.cartCount + item.quantity;
			});
		});

		this.productsObservable = this.store
			.select("products")
			.subscribe((response) => {
				this.products = response?.products;
				this.subTotal = 0;
				response?.products?.forEach((product) => {
					this.cart.forEach((item) => {
						if (product._id === item.productId) {
							this.subTotal = this.subTotal + product.price * item.quantity;
						}
					});
				});
			});

		this.deliveryMethodsObservable = this.store
			.select("deliveryMethods")
			.subscribe((response) => {
				this.deliveryMethods = response?.deliveryMethods;
			});

		this.paymentMethodsObservable = this.store
			.select("paymentMethods")
			.subscribe((response) => {
				this.paymentMethods = response?.paymentMethods;
			});

		this.ordersObservable = this.store.select("order").subscribe((response) => {
			if (response.selectedOrder) {
				this.isOrderSuccess = true;
				this.cart.forEach((item) => {
					this.store.dispatch(deleteFromCart({ productId: item.productId }));
				});
				this.router.navigate(["/order-complete"], {
					queryParams: { order: response.selectedOrder._id },
				});
			}
			if (response.error) {
				this.handleServerError();
			}
		});

		this.titleService.setTitle(`Tramitar Pedido | Próxima`);

		this.getProductData();
		this.store.dispatch(getPaymentMethods());
		this.store.dispatch(getDeliveryMethods());

		this.initForm();
	}

	ngOnDestroy() {
		this.productsObservable.unsubscribe();
		this.cartObservable.unsubscribe();
		this.deliveryMethodsObservable.unsubscribe();
		this.ordersObservable.unsubscribe();
		this.paymentMethodsObservable.unsubscribe();
		this.isOrderSuccess = false;
	}

	getProductData() {
		this.productIds = [];
		this.cart.forEach((product) => {
			this.productIds.push(product.productId);
		});
		if (this.productIds.length) {
			this.store.dispatch(
				getProducts({
					userPostCode: this.userPostCode,
					filters: { _id: this.productIds },
				})
			);
		}
	}

	initForm() {
		this.name = new FormControl("", [Validators.required]);
		this.surname = new FormControl("", [Validators.required]);
		this.address = new FormControl("", [Validators.required]);
		this.city = new FormControl("", [Validators.required]);
		this.postCode = new FormControl("", [
			Validators.required,
			Validators.maxLength(5),
			Validators.minLength(5),
		]);
		this.phone = new FormControl("", [Validators.required]);
		this.deliveryMethod = new FormControl("", [Validators.required]);
		this.paymentMethod = new FormControl("", [Validators.required]);

		this.checkoutForm = new FormGroup({
			name: this.name,
			surname: this.surname,
			address: this.address,
			city: this.city,
			postCode: this.postCode,
			phone: this.phone,
			deliveryMethod: this.deliveryMethod,
			paymentMethod: this.paymentMethod,
		});

		this.onChanges();
	}

	onChanges() {
		this.checkoutForm.get("paymentMethod").valueChanges.subscribe((val) => {
			const paymentLabels = document.querySelectorAll(
				".checkout__paymentLabel"
			);
			[...paymentLabels].forEach((label) => {
				const input = label.querySelector("input");
				if (input.checked) {
					label.classList.add("active");
					label.nextElementSibling?.classList.add("active");
				} else {
					label.classList.remove("active");
					label.nextElementSibling?.classList.remove("active");
				}
				label.classList.remove("error");
			});
		});

		this.checkoutForm.get("deliveryMethod").valueChanges.subscribe((val) => {
			const switchLabels = document.querySelectorAll(".checkout__switchLabel");
			[...switchLabels].forEach((label) => {
				const input = label.querySelector("input");
				if (input.checked) {
					label.classList.add("active");
					label.nextElementSibling?.classList.add("active");
				} else {
					label.classList.remove("active");
					label.nextElementSibling?.classList.remove("active");
				}
				label.classList.remove("error");
			});
			if (val === "HOME_DELIVERY") {
				this.deliveryFee = 2;
			} else {
				this.deliveryFee = 0;
			}
		});
	}

	handleForm() {
		this.error = false;
		if (!this.checkoutForm.valid) {
			this.checkoutForm.markAllAsTouched();

			const invalidInputRadio = document.querySelectorAll(
				".checkout__inputRadio"
			);
			invalidInputRadio?.forEach((input) => {
				input.classList.contains("ng-invalid")
					? input.parentElement.classList.add("error")
					: input.parentElement.classList.remove("error");
			});

			const invalidSwitch = document.querySelectorAll(
				".checkout__paymentInput"
			);
			invalidSwitch?.forEach((input) => {
				input.classList.contains("ng-invalid")
					? input.parentElement.classList.add("error")
					: input.parentElement.classList.remove("error");
			});
		} else {
			this.createOrder();
		}
	}

	createOrder() {
		const button: HTMLButtonElement =
			document.querySelector(".checkout__button");
		button.disabled = true;
		button.classList.add("loading");
		button.querySelector("span").innerText = "Realizando pedido...";

		let paymentMethod: PaymentMethod;
		let deliveryMethod: DeliveryMethod;
		let deliveryAddress: string;

		this.paymentMethods.forEach((method) => {
			if (method.type === this.checkoutForm.get("paymentMethod").value) {
				paymentMethod = method;
			}
		});

		this.deliveryMethods.forEach((method) => {
			if (method.type === this.checkoutForm.get("deliveryMethod").value) {
				deliveryMethod = method;
			}
		});

		deliveryAddress = `${this.checkoutForm.get("address").value}, ${
			this.checkoutForm.get("postCode").value
		}, ${this.checkoutForm.get("city").value}`;

		let order: Order = {
			deliveryMethod: deliveryMethod?._id,
			paymentMethod: paymentMethod?._id,
			name: `${this.name.value} ${this.surname.value}`,
			phone: this.phone.value,
			deliveryAddress: deliveryAddress,
			products: [...this.cart],
			deliveryFee: this.deliveryFee,
			user: this.userId,
		};

		if (paymentMethod.type === "ONLINE_CARD_PAYMENT") {
			//handle online payment
		}

		if (paymentMethod.type === "OFFLINE_PAYMENT") {
			this.store.dispatch(createOrder({ createdOrder: order }));
		}
	}

	handleServerError() {
		const button: HTMLButtonElement =
			document.querySelector(".checkout__button");
		button.disabled = false;
		button.classList.remove("loading");
		button.querySelector("span").innerText = "Realizar Pedido";
		this.error = true;
	}
}
