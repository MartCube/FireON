export const AppQuery = groq`*[ _type == 'app'][0]{
	"logo": logo.asset._ref,
	"links": links[] { title, hashtag },
	"smedias": smedias[] { name, icon, link },
	content[]{
		_type == 'intro' => { ..., 'image':image.asset._ref, "bg": bg.asset._ref },
		_type == 'features' => { ..., list[]{ title, description, "image":image.asset._ref } },
		_type == 'magazines' => { ..., list[]->{ "svg": svg.asset._ref, "uid": uid.current, info, "image": gallery[0].asset._ref, } },
		_type == 'cta' => { ..., "image": image.asset._ref, "bg": bg.asset._ref },
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

export const MagazineQuery = groq`*[ _type == 'magazine' && uid.current == $uid][0]{
	name,
	"uid": uid.current,
	info,
	price,
	description[],
	"svg": svg.asset._ref,
	"gallery": gallery[].asset._ref,
	colors[]->{ name, hexcode },
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