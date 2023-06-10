import { useFetch } from '@vueuse/core'
import { UserData, ttnDataType, Product } from '../types'

export default async function(orderNumber: string) {
	const config = useRuntimeConfig()
	const user = JSON.parse(localStorage.getItem('user_data') as string ) as UserData
	const localStTTNdata = JSON.parse(localStorage.getItem('createTTNdata') as string) as ttnDataType


	interface crmProduct {
		"amount": string,
		"title":  string,
		"product_attributes": {
			"sku": string,
			"title":  string,
			"price": number,
			"currency": "UAH"
		},
		// "custom_fields": [
		// 	{
		// 		"name": string,
		// 		"value": string
		// 	}
		// ]
	}
	let userProductsCrm: crmProduct[] = []

	user.products.forEach( el => {
		userProductsCrm.push(
			{
				"amount": `${el.count}`,
				"title":  el.name,
				"product_attributes": {
					"sku": `${el.sku}`,
					"title":  el.name,
					"price": el.price,
					"currency": "UAH"
				},

			},
		)
	});


	// let ttnDataCrm = 	[{
	// 	"name": "TTN Data",
	// 	"type": "object",
	// 	"fields": [
	// 		{
	// 			"name": "TTN Number",
	// 			"value": localStTTNdata.data[0].IntDocNumber,
	// 		},
	// 		{
	// 			"name": "Delivery cost",
	// 			"value": localStTTNdata.data[0].CostOnSite,
	// 		},
	// 		{
	// 			"name": "Delivery date",
	// 			"value": localStTTNdata.data[0].EstimatedDeliveryDate,
	// 		},
	// 	]
	// }]

	const crmBodyParams = {
		"title": `#${orderNumber} - Замовлення із сайту`,
		"total": 500,
		"currency": "UAH",
		"stage_id": 1,
		"source_id": 5,
		"funnel_id": 1,
		"comment": `
				"TTN Number"
				${localStTTNdata.data[0].IntDocNumber}
		
		`,
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
			'X-Auth-Token': "emDm2fpzETbz1bowHBx7NRC5",
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