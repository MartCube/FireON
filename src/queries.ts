export const AppQuery = groq`*[ _type == 'app' && __i18n_lang == $lang][0]{
	"logo": logo.asset._ref,
	"productGalleryBg": productGalleryBg.asset._ref,
	"links": links[] { title, hashtag },
	"smedias": smedias[] { name, icon, link },
	content[]{
		_type == 'intro' => { ..., 'image':image.asset._ref, "bg": bg.asset._ref, "bgMobile": bgMobile.asset._ref},
		_type == 'features' => { ..., list[]{ title, description, "image":image.asset._ref } },
		_type == 'magazines' => { ..., list[]->{ name, "svg": svg.asset._ref, info, "image": colorMagazines[0].gallery[0].asset._ref, "home_image": home_image.asset._ref} },
		_type == 'cta' => { ..., "image": image.asset._ref, "bg": bg.asset._ref, "bgMobile": bgMobile.asset._ref },
		_type == 'techSpecs' => { ..., list[]{ title, icon, description } },
		_type == 'about' => { ..., 'image':image.asset._ref },
		_type == 'gallery' => { ..., "list": list[].asset._ref },
		_type == 'partners' => { ..., list[]{ name, link, 'image': image.asset._ref } },
		_type == 'contact' => { ..., 'image': image.asset._ref, form{ title, button, name{ name, label, placeholder }, phone{ name, label, placeholder }, message{ name, label, placeholder }, }, },
	},
	"metaTags": {
		"lang": __i18n_lang,
		"uid": "/",
		...metaTags {
			title,
			description,
			"image": image.asset._ref
		}
	},
}`

export const MagazineQuery = groq`*[ _type == 'magazine' && name == $uid && __i18n_lang == $lang ][0]{
	name,
	"svg": svg.asset._ref,
	info,
	colorMagazines[]{
		color,
		price,
		sku,
		"gallery": gallery[].asset._ref,
		isProductActive,
	},
	description[],
	colorTitle,
	button,
	"home_image": home_image.asset._ref,
}`

export const BasketQuery = groq`*[ _type == 'basket' && __i18n_lang == $lang ][0]{
	"basket": {
		title,
		totalSum,
		emptyBasketMsg,
	},
	"form": form {
		title,
		place { label, placeholder, name },
		firstname { label, placeholder, name },
		middlename { label, placeholder, name },
		lastname { label, placeholder, name },
		warehouse { label, placeholder, name },
		email { label, placeholder, name },
		phone { label, placeholder, name }, 
		comment { label, placeholder, name },
		promoCode { label, placeholder, name },
		button,
	},
	response
}`

export const Sitemap_Q = groq`*[ _type in ["app", "magazine",] ]{
	_type == "app" && __i18n_lang == 'ua' => {
		"url": "/",
		"changefreq": "monthly",
		"priority": 1,
		"lastmod" :_updatedAt,
    },
    _type == "app" && __i18n_lang == 'en' => {
		"url": "/en/",
		"changefreq": "monthly",
		"priority": 1,
		"lastmod" :_updatedAt,
    },
    _type == "magazine" && __i18n_lang == 'ua' => {
		"url": "/" + name + "/",
		"changefreq": "monthly",
		"priority": 0.9,
		"lastmod" :_updatedAt,
    },
    _type == "magazine" && __i18n_lang == 'en' => {
		"url": "/" + name + "/",
		"changefreq": "monthly",
		"priority": 0.9,
		"lastmod" :_updatedAt,
    },
}`