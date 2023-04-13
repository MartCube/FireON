import { EmailData } from "../types"

export default function(orderNumber: string) {
	let data: EmailData;
	
	const rawdata = localStorage.getItem('user_checkout')
	data = JSON.parse(rawdata as string)
	// move it to scoped function or so  
	// prepare product email html
	let productsEmailTemplate: any;
	if(data) {
		productsEmailTemplate = data.products.map( el => 
			`<tr class="item">
				<td><strong>Name:</stong> ${el.name}</td>
				<td><strong>Image:</stong> <img src="https://cdn.sanity.io/images/okruw9dl/production/${el.image.slice(6, el.image.length - 4)}.png?h=100&w=250" ></td>
				<td><strong>Count:</stong> ${el.count}</td>
				<td><strong>Color:</stong> ${el.color}</td>
				<td><strong>Price:</stong> ${el.price}</td>
			</tr>`
			).join()
		}
		// console.log(productsEmailTemplate);
		const emailTemplate = `
		<p><strong>Номер замовлення:</stong> ${orderNumber}</p>
		<h4>Name: </h4><p>${data.name}</p>
		<h4>City: </h4><p>${data.city}</p>
		<h4>Warehouse: </h4><p>${data.warehouse}</p>
		<h4>Phone: </h4><p>${data.phone}</p>
		<h4>Comment: </h4><p>${data.comment}</p>
		<h4>Products</h4>
		<table class="products">
			<tbody>
				${productsEmailTemplate}
			</tbody>
		</table>
	`
	
	const requestEmailOptions = {
		method: 'POST',
		headers: {},
		body: emailTemplate,
	};
	// prepare product email html

	return requestEmailOptions
}