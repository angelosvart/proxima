import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/products/models/Product";

@Component({
	selector: "app-product-card",
	templateUrl: "./product-card.component.html",
	styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
	@Input()
	public product: Product;

	constructor() {}

	ngOnInit(): void {}
}
