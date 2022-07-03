export async function fetchData(basePath, region, timeRange, type) {
	console.log(basePath, region, timeRange, type)
	// const basePath = 'https://data.opennem.org.au/v3/stats/au/'
	// const url = `${basePath}${region}/${type}/${timeRange}.json`
	// const response = await fetch(url)
	let data = null

	if (basePath) {
		const url = `${basePath}data.json?region=${region}&time-range=${timeRange}&type=${type}`
		await fetch(url)
			.then((res) => res.json())
			.then((d) => (data = d))
	}

	return data
}
