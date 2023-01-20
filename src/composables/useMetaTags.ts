import type { MetaTags } from "~~/src/assets/types";
import imageUrlBuilder from '@sanity/image-url'

export default (data: MetaTags) => {

	const builder = imageUrlBuilder({
		projectId: useSanity().config.projectId,
		dataset: "production",
	})
	const ogImage = builder.image(data.image).auto('format').width(1200).height(630).url()


	const { fullPath } = useRoute()
	const domain = "https://fireon.netlify.app"
	const url = domain + fullPath

	useHead({
		title: data.title,
		htmlAttrs: { lang: 'en' },

		meta: [
			{ "charset": "utf-8" },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: "author", content: "Mart Cube" },
			{ name: 'title', content: data.title },
			{ name: 'description', content: data.description },
			// { name: 'robots', content: 'index, nofollow' },
			// og
			{ property: 'og:locale', content: 'uk', }, // ukrainian
			// { property: "og:locale:alternate", content: "en" },
			{ property: 'og:type', content: 'website', },
			{ property: 'og:title', content: data.title, },
			{ property: 'og:description', content: data.description, },
			{ property: 'og:image', content: ogImage, },
			{ property: 'og:image:alt', content: data.title, },
			{ property: 'og:url', content: url, },
			// twitter
			{ name: "twitter:title", content: data.title },
			{ name: "twitter:description", content: data.description },
			{ name: "twitter:image", content: ogImage },
			{ name: "twitter:image:alt", content: data.title },
			{ property: 'twitter:url', content: url, },
		],
	})
}