<script>
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { transformToEnergyDict, transformToEnergyData } from '$lib/modules/parser'
	import regionOptions from '$lib/constants/regions'
	import FormSelect from '$lib/components/form/Select.svelte'
	import DataTable from '$lib/components/DataTable.svelte'

	export let energy = null
	export let items = null
	let baseUrl = ''
	let selectedRegion = 'nem'
	let selectedTimeRange = '2021'
	let selectedType = 'energy'

	$: console.log('energy', energy)

	$: stats = energy
		? {
				code: energy.code,
				created: energy.created_at,
				network: energy.network,
				type: energy.type,
				version: energy.version
		  }
		: null

	/** @type {Array} */
	$: energyData = energy ? transformToEnergyData(energy.data) : []
	/** @type {Object} */
	$: energyDict = energy ? transformToEnergyDict(energy?.data) : {}
	/** @type {Array} */
	$: columns = energyData.length ? Object.keys(energyData[0]) : []

	$: res = fetchData(baseUrl, selectedRegion, selectedTimeRange, selectedType)

	$: console.log(items)

	async function fetchData(base, region, timeRange, type) {
		console.log(region, timeRange, type)
		const basePath = 'https://data.opennem.org.au/v3/stats/au/'
		// const url = `${basePath}${region}/${type}/${timeRange}.json`
		// const response = await fetch(url)

		if (base) {
			const url = `${base}data.json?region=${region}&time-range=${timeRange}&type=${type}`
			energy = await fetch(url).then((res) => res.json())
		}
	}

	onMount(() => (baseUrl = window.location.href))
</script>

<main class="p-6">
	<header>
		<h1>Data check</h1>
	</header>

	<FormSelect
		label="Type"
		name="type"
		options={[
			{ text: 'Energy', value: 'energy' },
			{ text: 'Emissions', value: 'emissions' }
		]}
		bind:value={selectedType}
	/>
	<FormSelect label="Region" name="region" options={regionOptions} bind:value={selectedRegion} />
	<FormSelect
		label="Data"
		name="datafile"
		options={[
			{ text: '7d', value: '7d' },
			{ text: '2021', value: '2021' }
		]}
		bind:value={selectedTimeRange}
	/>

	<DataTable {columns} tableData={energyData} tableDict={energyDict} />
</main>
