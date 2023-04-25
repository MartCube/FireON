import { useFetch } from '@vueuse/core'
import { EmailData } from '../types'

export default function() {
	const config = useRuntimeConfig()
	const user = JSON.parse(localStorage.getItem('user_checkout') as string ) as EmailData

	console.log(user);
	
	// create recipient 
	// this is for creating TTN 
	// method or will return you existing person 
	// or will create new one and will return you a data 
	// {
	// 	"apiKey": "[ВАШ КЛЮЧ]",
	// 	"modelName": "Counterparty",
	// 	"calledMethod": "save",
	// 	"methodProperties": {
	// 		"FirstName" : "Іван",
	// 		"MiddleName" : "Іванович",
	// 		"LastName" : "Іванов",
	// 		"Phone" : "380997979789",
	// 		"Email" : "test@i.com",
	// 		"CounterpartyType" : "PrivatePerson",
	// 		"CounterpartyProperty" : "Recipient"
	// 	}
	// 	{
	// 		"Description": "Приватна особа",
	// 		"Ref": "6a208b6d-c3e1-11ed-a60f-48df37b921db",
	// 		"City": "8d5a980d-391c-11dd-90d9-001a92567626",
	// 		"Counterparty": "208a60fa-45fc-48ef-98e5-53f0819ebf4f",
	// 		"FirstName": "Михайло",
	// 		"LastName": "Гончаренко",
	// 		"MiddleName": "Константинович",
	// 		"CounterpartyFullName": "",
	// 		"OwnershipFormRef": "",
	// 		"OwnershipFormDescription": "",
	// 		"EDRPOU": "",
	// 		"CounterpartyType": "PrivatePerson",
	// 		"TrustedCounterpartyType": "",
	// 		"CityDescription": ""
	// 	}

	// try to create recipient 
	// check if it's exist 
	// then fill TTN

	const createTTNrequestOptions = {
		"apiKey": config.public.novaposhta, // config
		"modelName": "InternetDocument",
		"calledMethod": "save",
		"methodProperties": {
			"SenderWarehouseIndex" : "11/225", // static value senders warehouse index
			"RecipientWarehouseIndex" : "11/3002", // warehouse from form
			"PayerType" : "Recipient",
			"PaymentMethod" : "Cashless", // +1 field to form
			"DateTime" : "дд.мм.рррр", // ! create a date
			"CargoType" : "Cargo",
			"Weight" : "1",
			"ServiceType" : "WarehouseWarehouse",
			"SeatsAmount" : "2",
			"Description" : "Додатковий опис відправлення", 
			"Cost" : "6000", // store totalPcice to local storage 
			"CitySender" : "8d5a980d-391c-11dd-90d9-001a92567626", // static value of the sender city 
			"Sender" : "6a208b6d-c3e1-11ed-a60f-48df37b921db", // static value sender ref
			"SenderAddress" : null, // 
			"ContactSender" : null, // 
			"SendersPhone" : "380933503569", // static value 
			"CityRecipient" : "00000000-0000-0000-0000-000000000000", // city from form 
			"Recipient" : "00000000-0000-0000-0000-000000000000",  // create recipient and get responce if exist fill data if not create new needed composables
			"RecipientAddress" : null, // 
			"ContactRecipient" : null, //  
			"RecipientsPhone" : "380660000000", // from form
			"OptionsSeat" : [
				{
					"volumetricVolume":"1",
					"volumetricWidth":"50",
					"volumetricLength":"50",
					"volumetricHeight":"50",
					"weight":"1"
				}
			]
		}
	}

	// const npRequestOptions = {
	// 	apiKey: config.public.novaposhta,
	// 	modelName: 'Counterparty',
	// 	calledMethod: 'getCounterparties',
	// 	methodProperties: {
	// 		CounterpartyProperty: 'Sender', // Specify that we're searching for a sender
	// 		Page: "1", // Replace with the name of the sender you're searching for
	// 	}
	// }

	// const { data, isFinished, error } = useFetch(config.public.npEndpoint, createTTNrequestOptions as object)
	// if(isFinished) {
	// 	console.log(data.value);
	// }

	// return isFinished

}