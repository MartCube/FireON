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
	title: string,
	description: string,
	image: string,
}
export interface App {
	logo: string,
	links: Link[],
	smedias: SocialMedia[],
	content: any[],
	metaTags: MetaTags,
}

// Magazine
export interface Color {
	name: string,
	hexcode: string,
}
export interface MagazineCard {
	svg: string,
	uid: string,
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
	uid: string,
	info: {
		size: string,
		rem: string,
		blk: string,
	},
	price: number,
	colors: Color[],
	description: any[],
	gallery: string[],
}
// Product
export interface Product {
	name: string,
	image: string,
	color: Color,
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
	city: TextField,
	name: TextField,
	phone: TextField,
	comment: TextField,
	button: string,
}