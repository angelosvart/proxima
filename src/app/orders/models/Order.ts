export interface Order {
	_id?: string;
	orderNumber?: number;
	created?: Date;
	isDelivered?: boolean;
	isPaid?: boolean;
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
