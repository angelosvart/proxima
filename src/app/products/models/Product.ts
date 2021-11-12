export interface Product {
	id: string;
	image: string;
	name: string;
	brand: string;
	description: string;
	category: string;
	subcategory: string;
	color: string;
	price: number;
	offerPrice: number;
	isOffer: boolean;
	isAvailable: boolean;
	owner: string;
}
