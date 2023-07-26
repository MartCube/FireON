import { UserData, ttnDataType } from "../types"
import { useFetch } from '@vueuse/core'

export default async function(orderNumber: string) {
	
	const rawdata = localStorage.getItem('user_data')
	
	const data: UserData = JSON.parse(rawdata as string)
	const invoice: string = localStorage.getItem('invoice') as string
	const localStTTNdata = JSON.parse(localStorage.getItem('createTTNdata') as string) as ttnDataType

	const config = useRuntimeConfig() 

	// prepare product email html
	let productsEmailTemplate: any;
	if(data) {
		productsEmailTemplate = data.products.map( el => 
			`<tr class="item">
				<td><div class="cell"><strong>Name:</stong> ${el.name}</div></td>
				<td><div class="cell"><strong>Image:</stong> <img src="https://cdn.sanity.io/images/okruw9dl/production/${el.image.slice(6, el.image.length - 4)}.png?h=100&w=250" ></div></td>
				<td><div class="cell"><strong>Count:</stong> ${el.count}</div></td>
				<td><div class="cell"><strong>Color:</stong> ${el.color}</div></td>
				<td><div class="cell"><strong>Price:</stong> ${el.price}</div></td>
				<td><div class="cell"><strong>Sku:</stong> ${el.sku}</div></td>
			</tr>`
			).join()
		}
		// console.log(productsEmailTemplate);
		const emailTemplate = `
		<div class="wrapper">
			<h3><strong>Номер замовлення:</stong> ${orderNumber}</h3>
			<div class="info-item">
				<h4>Name: </h4><p>${data.firstname} ${data.middlename} ${data.lastname === undefined || data.lastname === null ? '' : data.lastname}</p>
			</div>
			<div class="info-item">
			<h4>City: </h4><p>${data.place.Description}</p>
			</div>
			<div class="info-item">
			<h4>Warehouse: </h4><p>${data.warehouse.Description}</p>
			</div>
			<div class="info-item">
			<h4>Phone: </h4><p>${data.phone}</p>
			</div>
			<div class="info-item">
			<h4>Comment: </h4><p>${data.comment === undefined || data.comment === null ? '' : data.comment}</p>
			</div>
			<div class="info-item">
			<h4>TTN: ${localStTTNdata.data[0].IntDocNumber}</h4>
			</div>
			<div class="info-item">
			<h4>Invoice: ${invoice}</h4>
			</div>
			<h4>Products:</h4>
			<table class="products">
			<tbody>
			${productsEmailTemplate}
			</tbody>
			</table>
		</div>
	`
	
	const requestEmailOptions = {
		method: 'POST',
		headers: {},
		body: emailTemplate,
	};
	// prepare product email html

	
	// const fetch = async () => {
	try {
		const { response, error, data, isFinished } = await useFetch(`${config.public.domain}.netlify/functions/chekout`, requestEmailOptions)
		if(isFinished) {
			return response.value
		}
	} catch(err) {
		console.error("emailResponse err", err);
		return err
	}
		
	// }

	// return await fetch
}