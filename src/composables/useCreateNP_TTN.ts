import { useFetch } from '@vueuse/core'
import { UserData, ContactPerson } from '../types'

export default async function() {
	const config = useRuntimeConfig()
	const user = JSON.parse(localStorage.getItem('user_data') as string ) as UserData
	const endResponse = ref()
	
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
				"Phone": user.phone,
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
			const { data: createdUserData, isFinished: createUserState, error: createUserError } = await useFetch(config.public.npEndpoint, npUserRequestParams)
			if(createUserState) {
				const createUserResponse = JSON.parse(createdUserData.value as string)
				// console.log("createUserResponse", createUserResponse);

				// get Contact Pesson data
				const contactPersonData = await getContactRecipient(createUserResponse.data[0])
				localStorage.setItem("contactPersonData", JSON.stringify(contactPersonData))
				// console.log("contactPersonData", contactPersonData);
				
				// create TTN and return value back to frontend , to payment-status page
				return await createTTN(createUserResponse.data[0].Ref, contactPersonData.Ref)
				// return 

			} else if (createUserError) {
				console.error(createUserError);
				// return createUserError.value
			}

		} catch(error) {
			console.error(error);
			// return error
		}
	}

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
				"Weight" : parselCount,
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
				console.log("createTTNdata", createTTNdata.value);
				localStorage.setItem("createTTNdata", JSON.stringify(createTTNdata.value))
				return createTTNdata.value
			} else {
				console.error("createTTNdata error", createTTNerror);
				return { "createTTNdata error": createTTNerror }
			}
		} catch(err) {
			console.error("fetch error", err);
			return err
		}
	}

	endResponse.value = await createUser()

	return endResponse.value
	// if(endResponse.value !== undefined) {
	// 	return await endResponse.value
	// }
}