import { MagazineQuery } from "~~/src/queries"
import type { Magazine } from "~~/src/types"

// fetch data
// const { params } = useRoute()
// const { fetch } = useSanity()
// const { data, pending } = await useAsyncData(
// 	`${params.page} - page`,
// 	(): Promise<Page> => fetch(Page_Q, { uid: params.page })
// )

// // // handle error
// if (!data.value) throw createError({
// 	statusCode: 404,
// 	statusMessage: `${params.page} Not Found`,
// 	fatal: true
// })

// // write metatags
// useMetaTags(data.value.metaTags)