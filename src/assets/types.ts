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