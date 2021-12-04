import { Product } from "src/app/products/models/Product";

export interface Stores {
	_id?: string;
	name: string;
	contactName: string;
	email: string;
	phone: Number;
	address: String;
	postCode: Number;
	city: string;
	postCodesServing: Number[];
	products?: Product[];
}
