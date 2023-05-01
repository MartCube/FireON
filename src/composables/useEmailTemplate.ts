import { UserData } from "../types"

export default function(orderNumber: string) {
	let data: UserData;
	
	const rawdata = localStorage.getItem('user_data')
	data = JSON.parse(rawdata as string)
	// move it to scoped function or so  
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
			</tr>`
			).join()
		}
		// console.log(productsEmailTemplate);
		const emailTemplate = `
		<div class="wrapper">
			<h3><strong>Номер замовлення:</stong> ${orderNumber}</h3>
			<div class="info-item">
				<h4>Name: </h4><p>${data.firstname} ${data.middlename} ${data.lastname}</p>
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
				<h4>Comment: </h4><p>${data.comment}</p>
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

	return requestEmailOptions
}