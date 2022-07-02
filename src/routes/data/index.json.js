export async function get({ url }) {
  const params = url.searchParams
  const region = params.get('region')
  const timeRange = params.get('time-range')
  console.log(region, timeRange, fetch)

  // https://data.opennem.org.au/v3/stats/au/NEM/QLD1/energy/2021.json

  const dataUrl = `https://data.opennem.org.au/v3/stats/au/NEM/${region}/energy/2021.json`
	const response = await fetch(dataUrl)

  return {
    body: response.ok && (await response.json())
  }
}