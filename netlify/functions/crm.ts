import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
const fetch = require('node-fetch')

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
			'Authorization': `Bearer ${process.env.crmkey}`,
		},
		body: JSON.stringify(event.body),
	}

	try {
		
		console.log(await event.body);
		// const url = "https://openapi.keycrm.app/v1/order"

		// const response = await fetch(url, crmRequestParams)

		status = JSON.stringify(crmRequestParams)
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
