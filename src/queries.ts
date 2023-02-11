export const AppQuery = groq`*[ _type == 'app' && __i18n_lang == $lang][0]{
	"logo": logo.asset._ref,
	"links": links[] { title, hashtag },
	"smedias": smedias[] { name, icon, link },
	content[]{
		_type == 'intro' => { ..., 'image':image.asset._ref, "bg": bg.asset._ref, "bgMobile": bgMobile.asset._ref},
		_type == 'features' => { ..., list[]{ title, description, "image":image.asset._ref } },
		_type == 'magazines' => { ..., list[]->{ name, "svg": svg.asset._ref, info, "image": gallery[0].asset._ref, } },
		_type == 'cta' => { ..., "image": image.asset._ref, "bg": bg.asset._ref, "bgMobile": bgMobile.asset._ref },
		_type == 'techSpecs' => { ..., list[]{ title, icon, description } },
		_type == 'about' => { ..., 'image':image.asset._ref },
		_type == 'gallery' => { ..., "list": list[].asset._ref },
		_type == 'partners' => { ..., list[]{ name, link, 'image': image.asset._ref } },
		_type == 'contact' => { ..., 'image': image.asset._ref, form{ title, button, name{ name, label, placeholder }, phone{ name, label, placeholder }, message{ name, label, placeholder }, }, },
	},
	metaTags {
		title,
		description,
		"image": image.asset._ref,
	},
}`

export const MagazineQuery = groq`*[ _type == 'magazine' && name == $uid && __i18n_lang == $lang ][0]{
	name,
	info,
	price,
	description[],
	"svg": svg.asset._ref,
	"gallery": gallery[].asset._ref,
	"colors":  colors{ title, list[]->{ name, hexcode } },
	button,
}`

export const BasketQuery = groq`*[ _type == 'basket' && __i18n_lang == $lang ][0]{
	"basket": {
		title,
    	totalSum,
		emptyBasketMsg,
	},
    "form":form{
      	title,
      	place { label, placeholder, name},
      	name { label, placeholder, name},
      	phone { label, placeholder, name}, 
      	comment { label, placeholder, name},
		button,
    },
    success
}`

export const Sitemap_Q = groq`[
	...*[ _type == 'magazine']{
		"url": "/" + uid.current + "/",
		"changefreq":"monthly",
		"priority": 0.9,
		"lastmod": _updatedAt,
	},
	...*[ _type == 'app']{
		"url": "/",
		"changefreq": "monthly",
		"priority": 1,
		"lastmod": _updatedAt,
	},
]`