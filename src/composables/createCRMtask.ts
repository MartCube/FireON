import { useFetch } from '@vueuse/core'
import { UserData, ttnDataType, Product } from '../types'

export default async function(orderNumber: string) {
	const config = useRuntimeConfig()
	const user = JSON.parse(localStorage.getItem('user_data') as string ) as UserData
	const localStTTNdata = JSON.parse(localStorage.getItem('createTTNdata') as string) as ttnDataType


	interface crmProduct {
		price: number,
		quantity: number,
		name: string,
		picture: string,
		properties: <k, v>[],
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


	const data = {
		source_id: 22,
		buyer: {
			full_name: 'John Doe',
			email: 'johndoe@example.com',
			phone: '1234567890',
		},
		shipping: {
			shipping_address_city: 'City',
			shipping_receive_point: 'Street',
			shipping_address_country: 'Country',
			shipping_address_region: 'Region',
			shipping_address_zip: '12345',
		},
		products: [
			// {
			// 	price: 10.99,
			// 	quantity: 1,
			// 	name: 'Product Name',
			// 	picture: 'https://example.com/product.jpg',
			// 	properties: [
			// 		{
			// 			name: 'Color',
			// 			value: 'Space Gray',
			// 		},
			// 	],
			// },
		],
	};
	const crmBodyParams = {
		"title": `#${orderNumber} - Замовлення із сайту`,
		"total": 500,
		"currency": "UAH",
		"stage_id": 0,
		"source_id": 5,
		"funnel_id": 1,
		"comment": `"TTN Number": ${localStTTNdata.data[0].IntDocNumber}`,
		"client_attributes": {
			"person": `${user.firstname} ${user.lastname} ${user.middlename}`,
			"email": user.email,
			"status_id": 1,
			"lead": true,
			"phones": [`${user.phone}`, ],
		},
		"jobs_attributes": userProductsCrm,
	}
	
	const crmRequestParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': config.public.crmkey,
			'accept': 'application/json',
		},
		body: JSON.stringify(crmBodyParams),
	}

	console.log(crmBodyParams);
	

	try {
		const { data: createdTaskData, isFinished: createTaskState, error: createTaskError } = await useFetch(`${config.public.crmEndpoint}agreements`, crmRequestParams as object)
		if(createTaskState) {
			console.log(createdTaskData.value);
			return createdTaskData.value
		}
		else {
			console.error(createTaskError);
		}
	} catch (err) {
		console.error("Create CRM task err", err);
		
	}
}