import { useFetch } from '@vueuse/core'
import { UserData, ttnDataType, Product } from '../types'

export default async function(orderNumber: string) {
	const config = useRuntimeConfig()
	const user = JSON.parse(localStorage.getItem('user_data') as string ) as UserData
	const localStTTNdata = JSON.parse(localStorage.getItem('createTTNdata') as string) as ttnDataType
	let response;
	let error;

	interface crmProduct {
		price: number,
		quantity: number,
		name: string,
		// picture: string,
		properties: Array<{name: string, value: number}>,
	}

	const userProductsCrm: crmProduct[] = user.products.map((el: Product) => {
		return {
				price: el.price,
				quantity: el.count,
				name: el.name,
				properties: [
					{
						name: "Sku",
						value: el.sku,
					},
				]
			}
	});
// picture: `https://fireon.com.ua/${el.image}`,
	
	const totalPrice: number = user.products.reduce((acc: number, cur: Product) => acc + (cur.price*cur.count), 0)
	
	const crmBodyParams = {
		"source_id": "1",
		"manager_comment": `#${orderNumber} - Замовлення із сайту`,
		"shipping_price": `${localStTTNdata.data[0].CostOnSite}`,
		"manager_id": 3,
		"ordered_at": new Date().toISOString().slice(0, -5).split("T").join(" "),
		"wrap_price": totalPrice,
		"buyer": {
			"full_name": `${user.firstname} ${user.lastname} ${user.middlename === undefined || user.lastname === null ? '' : user.lastname}`,
			"email": user.email,
			'phone': `${user.phone}`,
		},
		"shipping": {
			"delivery_service_id": 1,
			"tracking_code": `${localStTTNdata.data[0].IntDocNumber}`,
			"shipping_service": "Нова Пошта",
			"shipping_address_city": user.warehouse.CityDescription,
			"shipping_address_country": "Ukraine",
			"shipping_address_zip": user.warehouse.PostalCodeUA,
			"shipping_secondary_line": "string",
			"shipping_receive_point": user.warehouse.Description,
			"recipient_full_name": `${user.firstname} ${user.lastname} ${user.middlename}`,
			"recipient_phone": `${user.phone}`,
			// "warehouse_ref": user.warehouse.Ref,
		},
		"payments": [
			{
				"payment_method_id": 3,
				"payment_method": "Банківська картка",
				"amount": 850,
				"description": "платіж",
				"payment_date": new Date().toISOString().slice(0, -5).split("T").join(" "),
				"status": "paid"
			}
		],
		"products": userProductsCrm
	}

	const crmRequestParams = {
		method: 'POST',
		headers: {},
		body: JSON.stringify(crmBodyParams),
	}

	console.log(crmRequestParams);

	try {
		const { data: createdTaskData, isFinished: createTaskState, error: createTaskError } = await useFetch(`${config.public.domain}.netlify/functions/crm`, crmRequestParams as object)
		// const { data: createdTaskData, isFinished: createTaskState, error: createTaskError } = await useFetch('https://openapi.keycrm.app/v1/order', crmRequestParams as object)
		if(createTaskState) {
			console.log(createdTaskData.value);
			response = createdTaskData.value
			// return createdTaskData.value
		}
		else {
			error = createTaskError
			console.error("crmResponse err", error);
		}
	} catch (err) {
		error = err
		console.error("Create CRM task err", err);
		// return error
	}

	return await {response, error}
}