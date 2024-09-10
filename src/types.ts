export enum ColorWord {
	first = 'first',
	last = 'last',
}

// app
export interface Link {
	title: string,
	hashtag: string,
}
export interface SocialMedia {
	name: string,
	icon: string,
	link: string,
}
export interface MetaTags {
	lang: string,
	uid: string,
	title: string,
	description: string,
	image: string,
}
export interface App {
	logo: string,
	links: Link[],
	smedias: SocialMedia[],
	content: any[], // block content
	metaTags: MetaTags,
	productGalleryBg: string,
}

// Magazine
export interface MagazineCard {
	name: string,
	svg: string,
	// sku: number,
	info: {
		size: string,
		rem: string,
		blk: string,
	},
	image: string,
}
export interface colorMagazine{
	color: string,
	price: number,
	sku: number,
	gallery: string[],
	isProductActive: boolean
}
export interface Magazine {
	name: string,
	svg: string,
	info: {
		size: string,
		rem: string,
		blk: string,
	},
	colorMagazines: colorMagazine[],
	colorTitle: string,
	button: string,
	description: any[],
}


// Product
export interface Product {
	name: string,
	image: string,
	color: string,
	price: number,
	count: number,
	sku: number,
}

// blocks 
export interface TechSpec {
	title: string,
	icon: string,
	description: string,
}
export interface Partner {
	name: string,
	link: string,
	image: string,
}
export interface Feature {
	title: string,
	image: string,
	description: string,
}

// contact form
export interface TextField {
	name: string,
	label: string,
	placeholder: string,
}
export interface ContactForm {
	title: string,
	name: TextField,
	phone: TextField,
	message: TextField,
	button: string,
}
export interface CheckboxField {
	name: string,
	label: string,
	value: boolean
}

export interface CheckoutForm {
	title: string,
	place: TextField,
	warehouse: TextField
	firstname: TextField,
	middlename: TextField,
	lastname: TextField,
	email: TextField,
	phone: TextField,
	comment: TextField,
	promoCode: TextField,
	callme: CheckboxField,
	iban: CheckboxField,
	payment: CheckboxField,
	button: string,
}
export interface Basket {
	basket: {
		title: string,
		totalSum: string,
		emptyBasketMsg: string,
	},
	form: CheckoutForm,
	response: {
		success: {
			title: string,
			button: string,
		},
		error: {
			title: string,
			button: string,
		}
	}
}


// Sitemap
export interface Sitemap {
	url: string,
	changefreq: string,
	priority: number,
	lastmod: string,
}


// nova poshta types

export interface UserData {
	firstname: string,
	lastname: string,
	middlename: string,
	email: string,
	place: String,
	warehouse: String,
	// place: City,
	// warehouse: Warehouse,
	phone: string,
	comment: string,
	products: Product[],
	callme?: boolean,
	iban?: boolean,
	payment?: boolean,
	// promoCode: {}
	orderNumber?: string,
	invoiceId?: string,
	type?: string,
	status?: string,
} 

export interface City {
	Area: string,
	AreaDescription: string, 
	AreaDescriptionRu: string,
	CityID: string,
	Delivery1: string,
	Delivery2: string,
	Delivery3: string,
	Delivery4: string,
	Delivery5: string,
	Delivery6: string,
	Delivery7: string,
	Description: string,
	DescriptionRu: string,
	IsBranch: string,
	PreventEntryNewStreetsUser: string,
	Ref: string,
	SettlementType: string,
	SettlementTypeDescription: string,
	SettlementTypeDescriptionRu: string,
	SpecialCashCheck: number
}
export interface Warehouse {
		SiteKey: string,
		Description: string,
		DescriptionRu: string,
		ShortAddress: string,
		ShortAddressRu: string,
		Phone: string,
		TypeOfWarehouse: string,
		Ref: string,
		Number: string,
		CityRef: string,
		CityDescription: string,
		CityDescriptionRu: string,
		SettlementRef: string,
		SettlementDescription: string,
		SettlementAreaDescription: string,
		SettlementRegionsDescription: string,
		SettlementTypeDescription: string,
		SettlementTypeDescriptionRu: string,
		Longitude: string,
		Latitude: string,
		PostFinance: string,
		BicycleParking: string,
		PaymentAccess: string,
		POSTerminal: string,
		InternationalShipping: string,
		SelfServiceWorkplacesCount: string,
		TotalMaxWeightAllowed: string,
		PlaceMaxWeightAllowed: string,
		SendingLimitationsOnDimensions: {
			Width: number,
			Height: number,
			Length: number
		},
		ReceivingLimitationsOnDimensions: {
			Width: number,
			Height: number,
			Length: number
		},
		Reception : {
			Monday: string,
			Tuesday: string,
			Wednesday: string,
			Thursday: string,
			Friday: string,
			Saturday: string,
			Sunday: string
		},
		Delivery: {
			Monday: string,
			Tuesday: string,
			Wednesday: string,
			Thursday: string,
			Friday: string,
			Saturday: string,
			Sunday: string
		},
		Schedule: {
			Monday: string,
			Tuesday: string,
			Wednesday: string,
			Thursday: string,
			Friday: string,
			Saturday: string,
			Sunday: string
		},
		DistrictCode: string,
		WarehouseStatus: string,
		WarehouseStatusDate: string,
		CategoryOfWarehouse: string,
		RegionCity: string,
		WarehouseForAgent: string,
		MaxDeclaredCost: string,
		DenyToSelect: string,
		PostMachineType: string,
		PostalCodeUA: string,
		OnlyReceivingParcel: string,
		WarehouseIndex: string
}

export interface Payment {
	amount: number
	ccy: number
	createdDate: string
	finalAmount: number
	invoiceId: string
	modifiedDate: string
	reference: string
	status: string
}

export interface CrmResponse {
	data: {}, 
	res: string, 
	err: string
}
export interface ContactPerson {
	ContactPerson: {
		data: {
			Description: string,
			FirstName: string,
			LastName: string,
			MiddleName: string,
			Ref: string,
		}[],
		errorCodes: [],
		errors: [],
		info: [],
		infoCodes: [],
		messageCodes: [],
		success: boolean
		translatedErrors: [],
		warningCodes: [],
		warnings: string[],
	}, 
	Counterparty: string,
	CounterpartyType: string, 
	Description: string,
	EDRPOU: string, 
	FirstName: string,
	LastName: string,
	MiddleName: string,
	OwnershipForm: string,
	OwnershipFormDescription: string,
	Ref: string,
}

export interface ttnDataType {
	success: boolean,
	data:
	[
		{
			Ref: string,
			CostOnSite: number,
			EstimatedDeliveryDate: string,
			IntDocNumber: string,
			TypeDocument: string
		}
	],
	errors: any[],
	warnings: any[],
	info: any[],
	messageCodes: any[],
	errorCodes: any[],
	warningCodes: any[],
	infoCodes: any[]
}


export interface IMonobankResponse {
	type?: string,
  invoiceId: string,
  status: string,
  payMethod: string,
  amount: number,
  ccy: number,
  finalAmount: number,
  createdDate: string,
  modifiedDate: string,
  reference: string,
  destination: string,
  paymentInfo: {
    rrn: string,
    approvalCode: string,
    tranId: string,
    terminal: string,
    bank: string,
    paymentSystem: string,
    country: string,
    fee: number,
    paymentMethod: string,
    maskedPan: string
  }
}