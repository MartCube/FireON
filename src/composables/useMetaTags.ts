import type { MetaTags } from "~~/src/types";
import imageUrlBuilder from '@sanity/image-url'

export default (data: MetaTags) => {

	const { fullPath } = useRoute()
	const domain = "https://fireon.netlify.app"
	const altLang = "en"
	// links
	const canonical = domain + data.uid
	const alternate = domain + data.uid + altLang


	// og:url	twitter:url
	const url = domain + fullPath
	// og:image	twitter:image
	const builder = imageUrlBuilder({ projectId: useSanity().config.projectId, dataset: "production" })
	const image = builder.image(data.image).auto('format').width(1200).height(630).url()


	useHead({
		title: data.title,
		htmlAttrs: { lang: data.lang },
		link: [
			{ hid: 'alternate', rel: 'alternate', href: alternate, hreflang: altLang },
			{ hid: 'canonical', rel: 'canonical', href: canonical, hreflang: 'x-default' },
		],
		meta: [
			{ "charset": "utf-8" },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: "author", content: "Fire On" },
			{ name: 'title', content: data.title },
			{ name: 'description', content: data.description },
			// { name: 'robots', content: 'all' },
			// og
			{ property: 'og:type', content: 'website', },
			{ property: 'og:title', content: data.title, },
			{ property: 'og:description', content: data.description, },
			{ property: 'og:image', content: image, },
			{ property: 'og:image:alt', content: data.title, },
			{ property: 'og:url', content: url, },
			// twitter
			{ name: "twitter:title", content: data.title },
			{ name: "twitter:description", content: data.description },
			{ name: "twitter:image", content: image },
			{ name: "twitter:image:alt", content: data.title },
			{ property: 'twitter:url', content: url, },
		],
	})
}