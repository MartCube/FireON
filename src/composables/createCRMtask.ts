import { useFetch } from '@vueuse/core'
import { UserData, ttnDataType, Product, Payment } from '../types'

export default async function(orderNumber: string) {
	const config = useRuntimeConfig()
	const paymentData = JSON.parse(localStorage.getItem('invoiceData') as string ) as Payment
	const user = JSON.parse(localStorage.getItem('user_data') as string ) as UserData
	const localStTTNdata = JSON.parse(localStorage.getItem('createTTNdata') as string) as ttnDataType
	let response;
	let error;

	interface crmProduct {
		price: number,
		quantity: number,
		name: string,
		// picture: string,
		properties: Array<{name: string, value: string}>,
	}

	const userProductsCrm: crmProduct[] = user.products.map((el: Product) => {
		return {
				"price": el.price,
				"quantity": el.count,
				"name": el.name,
				"properties": [
					{
						"name": "Sku",
						"value": `${el.sku}`,
					},
				]
			}
	});
// picture: `https://fireon.com.ua/${el.image}`,
	
	const totalPrice: number = user.products.reduce((acc: number, cur: Product) => acc + (cur.price*cur.count), 0)
	const dateObj = new Date()
	const today = `${dateObj.getFullYear()}-${dateObj.getMonth() < 10 ? '0' + dateObj.getMonth() : dateObj.getMonth()}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds() < 10 ? '' + dateObj.getSeconds() : dateObj.getSeconds()}` 
	
	const crmBodyParams = {
		"source_id": 1,
		"manager_comment": `#${orderNumber} - Замовлення із сайту`,
		"shipping_price": localStTTNdata.data[0].CostOnSite,
		"manager_id": 3,
		"ordered_at": today,
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
		},
		"payments": [
			{
				"payment_method_id": 3,
				"payment_method": "Банківська картка",
				"amount": paymentData.finalAmount,
				"description": "платіж",
				"payment_date": paymentData.createdDate.slice(0, -1).split("T").join(" "),
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

	// console.log(crmRequestParams);

	try {
		const { data: createdTaskData, isFinished: createTaskState, error: createTaskError, response } = await useFetch(`${config.public.domain}.netlify/functions/crm`, crmRequestParams as object)

		
		if(createTaskState && response.value?.status === 201) {
			console.log(createdTaskData.value, response.value?.status);
			const data = await createdTaskData.value
			const res = ''
			const err = ''
			return {data, res, err}
		}
		else {
			const err = await response.value?.statusText
			const res = await response.value?.status
			const data = ''
			console.error("crmResponse err", createTaskError);
			return {data, res, err}
		}
	} catch (err) {
		error = err
		console.error("Create CRM task err", err);
		return error
	}

	return await {response, error}
}