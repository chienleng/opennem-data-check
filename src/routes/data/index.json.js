export async function get({ url }) {
	const params = url.searchParams
	const region = params.get('region')
	const regionPath = region === 'all' ? '/AU' : region === 'NEM' ? '/NEM' : `/NEM/${region}`
	const timeRange = params.get('time-range')
	console.log(region, timeRange, fetch)

	// https://data.opennem.org.au/v3/stats/au/NEM/QLD1/energy/2021.json
	// https://data.opennem.org.au/v3/stats/au/NEM/energy/2022
	///v3/stats/au/AU/energy/2022.json
	const dataUrl = `https://data.opennem.org.au/v3/stats/au${regionPath}/energy/${timeRange}.json`

	try {
		const response = await fetch(dataUrl)

		console.log(response)

		return {
			body: response.ok && (await response.json())
		}
	} catch(e) {
		console.log(e)
		return {}
	}
	
}
