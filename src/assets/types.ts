
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

export enum ColorWord {
	first = 'first',
	last = 'last',
}

export interface App {
	logo: string,
	links: Link[],
	smedias: SocialMedia[],
	content: any[],
	metaTags: MetaTags,
}
