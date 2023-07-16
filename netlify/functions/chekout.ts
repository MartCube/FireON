import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const sgMail = require('@sendgrid/mail')

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

	sgMail.setApiKey(process.env.NUXT_SENDGRID_API_KEY)
	const msg = {
		to: 'sales@fireon.com.ua', // Change to your recipient
		//to: 'devfireon97@gmail.com', 
		from: 'dev.fireon@gmail.com', // Change to your verified sender
		//sales@fireon.com.ua
		subject: 'Sending with SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: event.body,
	}
	let status: string = ''
	let statusCode: number = 200
	try {

		await sgMail
			.send(msg)
			.then(() => {
				console.log('Email sent')
				status = JSON.stringify('Email sent')
	
			})
			.catch((error: any) => {
				console.error(error)
				status = JSON.stringify(error)
				statusCode = 500
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
