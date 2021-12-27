import { Product } from "src/app/products/models/Product";
import { CartItem } from "./CartItem";

export interface Order {
	_id?: string;
	orderNumber?: number;
	created?: Date;
	isDelivered?: boolean;
	delivered?: Date;
	deliveryMethod: string;
	name: string;
	phone: string;
	deliveryAddress: string;
	paymentMethod: string;
	products: any;
	subtotalPrice?: number;
	deliveryFee: number;
	totalPrice?: number;
	user: string;
}
