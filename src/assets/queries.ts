export const AppQuery = groq`*[ _type == 'app'][0]{
	"logo": logo.asset._ref,
	"links": links[] { title, hashtag },
	"smedias": smedias[] { name, icon, link },
	content[]{
		_type == 'intro' => { ..., 'image':image.asset._ref },
		_type == 'features' => { ..., list[]{ title, description, "image":image.asset._ref } },
		_type == 'magazines' => { ... },
		_type == 'cta' => { ..., "image": image.asset._ref },
		_type == 'techSpecs' => { ..., list[]{ title, icon, description } },
		_type == 'about' => { ... },
		_type == 'gallery' => { ..., "list": list[].asset._ref },
		_type == 'partners' => { ..., list[]{ name, link, 'image': image.asset._ref } },
		_type == 'contact' => { ..., title,  form{ button, name{ label, placeholder }, phone{ label, placeholder }, message{ label, placeholder }, }, 'image': image.asset._ref },
	},
	metaTags {
		title,
		description,
		"image": image.asset._ref,
	},
}`