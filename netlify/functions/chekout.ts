import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const sgMail = require('@sendgrid/mail')

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY)
	const msg = {
		to: 'dev.fireon@gmail.com', // Change to your recipient
		from: 'dev.fireon@gmail.com', // Change to your verified sender
		subject: 'Sending with SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	}
	let status: string = ''
	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent')
			status = JSON.stringify('Email sent')
			return {
				statusCode: 200,
				body: status,
			};
		})
		.catch((error: any) => {
			console.error(error)
			status = JSON.stringify(error)
		})
		
		return {
			statusCode: 500,
			body: status,
		};
	};

export { handler };
