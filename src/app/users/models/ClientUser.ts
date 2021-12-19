export interface ClientUser {
	_id?: string;
	name: string;
	lastName: string;
	email: string;
	phone: Number;
	address: String;
	postCode: Number;
	city: string;
	password?: string;
}
