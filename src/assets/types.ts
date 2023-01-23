export enum ColorWord {
	first = 'first',
	last = 'last',
}

interface Link {
	title: string,
	hashtag: string,
}
interface SocialMedia {
	name: string,
	icon: string,
	link: string,
}

export interface MetaTags {
	title: string,
	description: string,
	image: string,
}

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

export interface App {
	logo: string,
	links: Link[],
	smedias: SocialMedia[],
	content: any[],
	metaTags: MetaTags,
}
