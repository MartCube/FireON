import { IMonobankResponse, UserData } from "../../types";
import useEmailTemplate from "../../composables/useEmailTemplate";


export default defineEventHandler(async (event) => {
	const body: IMonobankResponse | UserData = await readBody(event);
	let user: UserData = {
		firstname: '',
		lastname: '',
		middlename: '',
		comment: '',	
		phone: '',
		place: '',	
		warehouse: '',	
		products: [],
		email: '',
	}; // Initialize user variable with an empty object
	if(body.type === 'user') {
		user = body as UserData;
	}
	if(body.status === 'success') {
		console.log(body);
		await useEmailTemplate(user);
	}
	
});