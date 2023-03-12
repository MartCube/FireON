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
}

// Magazine
export interface MagazineCard {
	name: string,
	svg: string,
	info: {
		size: string,
		rem: string,
		blk: string,
	},
	image: string,
}
export interface Magazine {
	name: string,
	svg: string,
	info: {
		size: string,
		rem: string,
		blk: string,
	},
	colorMagazines: [{
		color: string,
		price: number,
		gallery: string[],
	}],
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
export interface CheckoutForm {
	title: string,
	place: TextField,
	name: TextField,
	phone: TextField,
	comment: TextField,
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