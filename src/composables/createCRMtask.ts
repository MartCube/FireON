import { useFetch } from '@vueuse/core'
import { UserData, ttnDataType, Product } from '../types'
import { object } from 'zod'

export default async function(orderNumber: string) {
	const config = useRuntimeConfig()
	const user = JSON.parse(localStorage.getItem('user_data') as string ) as UserData
	const localStTTNdata = JSON.parse(JSON.parse(localStorage.getItem('createTTNdata') as string)) as ttnDataType

	// ttn example response
	// const ttnData = {
	// 	"success": true,
	// 	"data":
	// 	[
	// 		{
	// 			"Ref":"6de0bed1-ee97-11ed-a60f-48df37b921db",
	// 			"CostOnSite":54,
	// 			"EstimatedDeliveryDate":"10.05.2023",
	// 			"IntDocNumber":"20450708132789",
	// 			"TypeDocument":"InternetDocument"
	// 		}
	// 	],
	// 	"errors":[],
	// 	"warnings":[],
	// 	"info":[],
	// 	"messageCodes":[],
	// 	"errorCodes":[],
	// 	"warningCodes":[],
	// 	"infoCodes":[]
	// }

	interface crmProduct {
		name: string,
		type: string,
		fields: {
			name: string,
			value: string
		}[]
	}
	let userProductsCrm: crmProduct[] = []

	user.products.forEach( el => {
		userProductsCrm.push(
			{
				"name": "Product",
				"type": "object",
				"fields": [
					{
						"name": "Product name",
						"value": el.name,
					},
					{
						"name": "Count",
						"value": `${el.count}`
					},
					{
						"name": "Color",
						"value": el.color
					},
					{
						"name": "Price",
						"value": `${el.price}`
					},
				]
			}
		)
	});


	let ttnDataCrm = 	[{
		"name": "TTN Data",
		"type": "object",
		"fields": [
			{
				"name": "TTN Number",
				"value": localStTTNdata.data[0].IntDocNumber,
			},
			{
				"name": "Delivery cost",
				"value": localStTTNdata.data[0].CostOnSite,
			},
			{
				"name": "Delivery date",
				"value": localStTTNdata.data[0].EstimatedDeliveryDate,
			},
		
		]
	}]

		
	const crmBodyParams = {
		"title": "Нова покупка",
		"comment": user.comment,
		"deadline_at": "",
		"time": "",
		"user_id": 1,
		"custom_fields": [
			{
				"name": "Order number",
				"value": orderNumber
			}
		],
		"client_attributes": {
			"person": `${user.firstname} ${user.lastname} ${user.middlename}`,
			"email": user.email,
			"lead": false,
			"source_id": 1,
			"status_id": 1,
			"phones": [
				user.phone,
			],
			"custom_fields": [
				{
					"name": "Customer products",
					"value": userProductsCrm,
				},
				{
					"name": "TTN data",
					"value": ttnDataCrm,
				}
			]
		}
	}
	
	const crmRequestParams = {
		method: 'POST',
		mode: "no-cors",
		credentials: "same-origin",
		headers: {
			'Content-Type': 'application/json',
			'accept': 'application/json',
			'X-Auth-Token': config.public.crmkey,
		},
		body: JSON.stringify(crmBodyParams),
	}

	console.log(crmRequestParams);
	

	try {
		const { data: createdTaskData, isFinished: createTaskState, error: createTaskError } = await useFetch(`${config.public.crmEndpoint}tasks`, crmRequestParams as object)
		if(createTaskState) {`$`
			console.log(createdTaskData.value);
			return createdTaskData.value
		}
	} catch (err) {
		console.error("Create CRM task err", err);
		
	}
}