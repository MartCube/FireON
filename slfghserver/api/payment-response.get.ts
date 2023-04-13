export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const cookies = parseCookies(event)
	// if (!body) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'error',
  //   })
  // }
	setResponseStatus(200)
	return { body, cookies, event }
})