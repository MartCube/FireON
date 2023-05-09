import { useFetch } from '@vueuse/core'
import { UserData } from '../types'

export default async function(orderNumber: string) {
	const config = useRuntimeConfig()
	const user = JSON.parse(localStorage.getItem('user_data') as string ) as UserData
	
		
	const crmBodyParams = {
		"title": "Запитання: Книга English is Easy",
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
			"person": "Прізвище Імʼя По батькові",
			"email": "pib@example.com",
			"lead": false,
			"source_id": 1,
			"status_id": 1,
			"phones": [
				"+380000000001"
			],
			"custom_fields": [
				{
					"name": "Адреса",
					"value": "Ужгород-1"
				}
			]
		}
	}
	
	const crmRequestParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'accept': 'application/json',
			'X-Auth-Token': config.public.crmkey,
		},
		body: JSON.stringify(crmBodyParams),
	}

	try {
		const { data: createdTaskData, isFinished: createTaskState, error: createTaskError } = await useFetch(config.public.crmEndpoint, crmRequestParams)
		if(createTaskState) {
			console.log(createdTaskData.value);
			
		}
	} catch (err) {
		console.error("Create CRM task err", err);
		
	}
}