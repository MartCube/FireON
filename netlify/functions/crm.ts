import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import fetch from 'node-fetch'

interface IResponse {
	type: string,
	url: string,
	status: number,
	statusText: string,
	headers: {
		'cache-control': string,
		connection: string,
		'content-length': string,
		'content-type': string,
		date: string,
		server: string,
		'x-correlation-id': string,
		'x-ratelimit-limit': string,
		'x-ratelimit-remaining': string
	},
	counter: number,
	highWaterMark: number
}


const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {


	let statusBody: string = ''
	let statusCode: number = 200
	let statusText: string = ''
	let url: string = ''
	// let body = JSON.stringify(event.body)

	const crmRequestParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Cache-Control': 'no-cache',
			'Pragma': 'no-cache',
			'Authorization': `Bearer ${process.env.NUXT_CRM}`,
		},
		body: event.body,
	}
	
	try {
		
		// const url = "https://openapi.keycrm.app/v1/pipelines/cards"
		const endpoint = "https://openapi.keycrm.app/v1/order"
		// console.log(crmRequestParams);
		
		await fetch(endpoint, crmRequestParams)
		.then((el: any) => {
			
			const response = {
				type: el.type,
				url: el.url,
				status: el.status,
				statusText: el.statusText,
				headers: {
					'cache-control': el.headers.get('cache-control'),
					connection: el.headers.get('connection'),
					'content-length': el.headers.get('content-length'),
					'content-type': el.headers.get('content-type'),
					date: el.headers.get('date'),
					server: el.headers.get('server'),
					'x-correlation-id': el.headers.get('x-correlation-id'),
					'x-ratelimit-limit': el.headers.get('x-ratelimit-limit'),
					'x-ratelimit-remaining': el.headers.get('x-ratelimit-remaining')
				},
				counter: el.counter,
				highWaterMark: el.highWaterMark
			}
			// console.log('response ', el);
			
			if(response.status !== 201) {
				throw new Error(response.statusText, {cause: response})
			}

			statusBody = JSON.stringify(response)
			statusCode = response.status 
			statusText = response.statusText
			url = response.url
			
		})
		.catch(err => {
			const errorParsed = err.cause as IResponse

			// console.error('err', errorParsed.status);
			statusCode = errorParsed.status;
			statusText = errorParsed.statusText;
			url = errorParsed.url;
		})

		return {
			statusCode: statusCode,
			body: statusText,
			statusText: statusText,
			url: url
		}
	}
	catch(err) {
		console.error(err);
		
		return {
			statusCode: statusCode,
			body: statusText,
			statusText: statusText,
			url: url
			
		}
	}
}

export { handler }
