import { Product } from './../types'

export default function(products: Product[]) {
		const config = useRuntimeConfig()
		//paymnet monobank
		let paymentBillBasketTotalPrice = 0
		// uah to coins
		products.map(el => paymentBillBasketTotalPrice += (el.price * el.count) * 100)
	
		let paymentBillBasketData = products.map(el => {
			return {
				"name": el.name,
				"qty": el.count,
				"sum": (el.price * el.count) * 100,
				"icon": `https://cdn.sanity.io/images/okruw9dl/production/${el.image.slice(6, el.image.length - 4)}.png?h=100&w=250`,
				"unit": "шт.",
				"code": crypto.randomUUID(),
				"header": el.name,
				"footer": "Футер",
				"tax": [
					0
				],
			}
		})
	
		// body data for monobank
		const paymentData = {
			"amount": paymentBillBasketTotalPrice,
			"ccy": 980,
			"merchantPaymInfo": {
				"reference": crypto.randomUUID(),
				"destination": "Магазин FireOn",
				"basketOrder": paymentBillBasketData
			},
			"redirectUrl": "http://localhost:8888/payment-status",
			// "webHookUrl": "https://f1de-213-135-161-93.eu.ngrok.io/server/api/payment-response",
			"validity": 3600,
			"paymentType": "debit",
		}
	
		// headers data for monobank
		const paymentRequestOptions = {
			method: 'POST',
			headers: {
				'X-Token': config.public.mono
			},
			body: JSON.stringify(paymentData),
		}

		return paymentRequestOptions
}