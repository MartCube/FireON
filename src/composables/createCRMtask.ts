import { useFetch } from '@vueuse/core'
import { UserData, ttnDataType } from '../types'

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
		picture: string,
		properties: Array<{name: string, value: number}>,
	}

	let userProductsCrm: crmProduct[] = []

	user.products.forEach( el => {
		userProductsCrm.push(
			{
				price: el.price,
				quantity: el.count,
				name: el.name,
				picture: el.image,
				properties: [
					{
						name: "Sku",
						value: el.sku,
					},
					{
						name: "Sku",
						value: el.sku,
					},
					
				]
			},
		)
	});


	const crmBodyParams = {
		"source_id": 1,
		"manager_comment": `#${orderNumber} - Замовлення із сайту`,
		"shipping_price": `${localStTTNdata.data[0].CostOnSite}`,
		"ordered_at": `${localStTTNdata.data[0].EstimatedDeliveryDate}`,
		"buyer": {
			"full_name": `${user.firstname} ${user.lastname} ${user.middlename}`,
			"email": user.email,
			'phone': `${user.phone}`
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
			"warehouse_ref": user.warehouse.Ref,
		},
		"products": userProductsCrm
	}

	const crmRequestParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Cache-Control': 'no-cache',
			'Pragma': 'no-cache',
			'Authorization': `Bearer ${config.public.crmkey}`,
		},
		body: JSON.stringify(crmBodyParams),
	}

	console.log(crmBodyParams);
	

	try {
		const { data: createdTaskData, isFinished: createTaskState, error: createTaskError } = await useFetch('https://openapi.keycrm.app/v1/order', crmRequestParams as object)
		if(createTaskState) {
			console.log(createdTaskData.value);
			response = createdTaskData.value
			return createdTaskData.value
		}
		else {
			error = createTaskError
			console.error(createTaskError);
		}
	} catch (err) {
		error = err
		console.error("Create CRM task err", err);
		
	}

	return {response, error}
}