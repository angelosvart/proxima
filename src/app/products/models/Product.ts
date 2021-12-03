export interface Product {
	_id: string;
	image: string;
	name: string;
	brand: string;
	description: string;
	category: string;
	subcategory: string;
	color: string;
	price: number;
	previousPrice: number;
	isOffer: boolean;
	isAvailable: boolean;
	store: any;
}
