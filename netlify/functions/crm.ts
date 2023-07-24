import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import fetch from 'node-fetch'

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

	let status: string = ''
	let statusCode: number = 200

	const crmRequestParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Cache-Control': 'no-cache',
			'Pragma': 'no-cache',
			'Authorization': `Bearer ${process.env.NUXT_CRM}`,
		},
		body: JSON.parse(event.body as string),
	}

	try {
		
		// const url = "https://openapi.keycrm.app/v1/pipelines/cards"
		const url = "https://openapi.keycrm.app/v1/order"

		await fetch(url, crmRequestParams).then((el: any) => {
			console.log('response ', el);
			
			status = JSON.stringify(el)
			
		}).catch(err => {
			console.error('err', err);
			return {
				statusCode: 404,
				body: JSON.stringify(err),
			}
		})

		return {
			statusCode: await statusCode,
			body: status,
		}
	}
	catch(err) {
		return {
			statusCode: 500,
			body: JSON.stringify(err),
		}
	}
}

export { handler }
