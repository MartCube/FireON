export default function() {
	const config = useRuntimeConfig()

		
	const crmBodyParams = {
		"title": "Запитання: Книга English is Easy",
		"comment": "Чи можлива знижка?",
		"deadline_at": "2018-01-01",
		"time": "13:15",
		"user_id": 1,
		"custom_fields": [
			{
				"name": "Джерело",
				"value": "Сайт"
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