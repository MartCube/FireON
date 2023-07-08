import { useFetch } from '@vueuse/core'
import { UserData, ContactPerson } from '../types'

export default async function() {
	const config = useRuntimeConfig()
	const user = JSON.parse(localStorage.getItem('user_data') as string ) as UserData
	console.log(user);
	
	const endResponse = ref()
	const error = ref('')
	
	// get recipient 
	// Set up the request parameters
	const createUser = async () => {
		const createUserBodyParams = {
			"apiKey": config.public.novaposhta,
			"modelName": "Counterparty",
			"calledMethod": "save",
			"methodProperties": {
				"FirstName": user.firstname,
				"MiddleName": user.middlename,
				"LastName": user.lastname,
				"Phone": `${user.phone}`,
				// "Phone": user.phone,
				"Email": user.email,
				"CounterpartyType": "PrivatePerson",
				"CounterpartyProperty": "Recipient"
			}
		};
	
		const npUserRequestParams = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(createUserBodyParams)
		}
	
		try {
			const { data: npUserData, isFinished: createUserState, error: createUserError } = await useFetch(config.public.npEndpoint, npUserRequestParams)
			if(createUserState) {
				const createUserResponse = JSON.parse(npUserData.value as string)
				// console.log("createUserResponse", createUserResponse);
				return createUserResponse

			} else if (createUserError) {
				console.error(createUserError);
				error.value = `createUserError: ${createUserError}`
				// return createUserError.value
			}

		} catch(err) {
			console.error(err);
			error.value = String(err)
			// return error
		}
	}

	// 1 пакет = 1кг
	// 1 магазин = 0,4 кг 
	// округлять до целых чисел 

	// 
	// get contactPerson
	const getContactRecipient = async (user: ContactPerson) => {
		// console.log(user);
		
		const userRef = user.Ref

		if(user.ContactPerson.warnings.includes("Person already exists!")) {
			const contactPersonRef =  user.ContactPerson.data.filter( el => el.LastName === user.LastName)[0]
			// console.log(contactPersonRef);
			return contactPersonRef
		}
		else {
			const contactRecipientBodyOptions = {
				"apiKey": config.public.novaposhta,
				"modelName": "Counterparty",
				"calledMethod": "getCounterpartyContactPersons",
				"methodProperties": {
					"Ref" : userRef,
					"Page" : "1"
				}
			}
	
			const contactRecipientRequestParams = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(contactRecipientBodyOptions)
			}

			try {

				const { data: contactRecipientData, isFinished: contactRecipientState, error: contactRecipientError } = await useFetch(config.public.npEndpoint, contactRecipientRequestParams as object)
				
				if(contactRecipientState) {
					const parsedRecipirntData = JSON.parse(contactRecipientData.value as string)

					localStorage.setItem("parsedRecipirntData", JSON.stringify(parsedRecipirntData))
					// console.log(parsedRecipirntData.data.Ref);
					return parsedRecipirntData.data.Ref
				}
			} catch(err) {
				error.value = String(err)
				console.error("getContactRecipient", err);
			}

		}
	}
	

	// create TTN
	const createTTN = async (userRef: string, contactRecipient: string) => {

		// calculate total price
		let paymentBillBasketTotalPrice = 0
		user.products.map(el => paymentBillBasketTotalPrice += el.price * el.count)
		
		// calculate how many parsels 
		// we assume 1 parcel = 1 kg = 1 seat for now
		let parselCount = 0
		user.products.map(el => parselCount += el.count)

		// create date
		const dateRaw = new Date()
		const dateForTTN = `${dateRaw.getDate() < 10	? 0 : ''}${dateRaw.getDate()}.${dateRaw.getMonth() + 1 < 10 ? 0 : ''}${dateRaw.getMonth() + 1}.${dateRaw.getFullYear()}`
		const weight = parselCount * 0.4
		// configure request body params 
		const createTTNrequestBodyOptions = {
			"apiKey": config.public.novaposhta, // config
			"modelName": "InternetDocument",
			"calledMethod": "save",
			"methodProperties": {
				"SenderWarehouseIndex" : "11/225", // static value senders warehouse index
				"RecipientWarehouseIndex" : user.warehouse.WarehouseIndex, // warehouse from form, from localStorage
				"PayerType" : "Recipient",
				"PaymentMethod" : "Cash", // +1 field to form
				"DateTime" : dateForTTN, // ! create a date
				"CargoType" : "Parcel",
				"Weight" : weight,
				"ServiceType" : "WarehouseWarehouse",
				"SeatsAmount" : parselCount,
				"Description" : "Додатковий опис відправлення", 
				"Cost" : paymentBillBasketTotalPrice, // store totalPcice to local storage 
				"CitySender" : "8d5a980d-391c-11dd-90d9-001a92567626", // static value of the sender city 
				"Sender" : "6a208b6d-c3e1-11ed-a60f-48df37b921db", // static value sender ref
				"SenderAddress" : "", // 
				"ContactSender" : "6a215c26-c3e1-11ed-a60f-48df37b921db", // 
				"SendersPhone" : "380933503569", // static value of sender Goncharenko
				"CityRecipient" : user.place.Ref, // city from form , from localStorage
				"Recipient" : userRef,  // create recipient function createUser()
				"RecipientAddress" : "", // 
				"ContactRecipient" : contactRecipient, //  function getContactRecipient()
				"RecipientsPhone" : user.phone, // from form, from localStorage
				// "OptionsSeat" : [ // optional we can calcualte whole parsel а width = 30cm на height = 10cm на length = 5cm 
				// 	{
				// 		"volumetricVolume":"1",
				// 		"volumetricWidth":"50",
				// 		"volumetricLength":"50",
				// 		"volumetricHeight":"50",
				// 		"weight":"1"
				// 	}
				// ]
			}
		}
		
		// configure request params 
		const npTTNRequestParams = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(createTTNrequestBodyOptions)
		}

		try {
			const { data: createTTNdata, isFinished: createTTNstate, error: createTTNerror } = await useFetch(config.public.npEndpoint, npTTNRequestParams as object)
			if(createTTNstate) {
				// console.log("createTTNdata", createTTNdata.value);
				localStorage.setItem("createTTNdata", createTTNdata.value as string)
				return createTTNdata.value
			} else {
				// console.error("createTTNdata error", createTTNerror);
				return error.value = String(createTTNerror)
			}
		} catch(err) {
			console.error("fetch error", err);
			error.value = String(err)
			return err
		}
	}

	new Promise((resolve, reject) => {
		const user = createUser()
		user.then(data => resolve(data)).catch(err => reject(err))
	}).then(async (user: any) => {
		// get Contact Person data
		const recipient = await getContactRecipient(user.data[0])
		localStorage.setItem("contactPersonData", JSON.stringify(recipient))
		return {recipient, user}
		
	}).then(async ({recipient, user}: any) => {
		const ttn = await createTTN(user.data[0].Ref, recipient.Ref)
		// console.log(ttn);	
		
		endResponse.value = ttn
		// create TTN and return value back to frontend , to payment-status page
		return ttn
	}).catch(err => {
		error.value = err
		console.error(err)
	})



	

	return {endResponse, error}
	// if(endResponse.value !== undefined) {
	// 	return await endResponse.value
	// }
}