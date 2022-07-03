<script>
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { transformToEnergyDict, transformToEnergyData, filterByType } from '$lib/modules/parser'
	import { fetchData } from '$lib/modules/api'
	import regionOptions from '$lib/constants/regions'
	import FormSelect from '$lib/components/form/Select.svelte'
	import DataTable from '$lib/components/DataTable.svelte'

	export let items = null
	let energy = null
	let baseUrl = ''
	let selectedRegion = 'tas1'
	let selectedTimeRange = '2021'
	let selectedType = '.energy'

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
	$: energyDict = energy ? transformToEnergyDict(energy.data) : {}
	/** @type {Array} */
	$: columns = energyData.length ? filterByType(selectedType, Object.keys(energyData[0])) : []

	$: if (baseUrl) {
		fetchData(baseUrl, selectedRegion, selectedTimeRange, selectedType).then((r) => (energy = r))
	}

	$: console.log('energy', energy)
	$: console.log('columns', columns)
	$: console.log('energyData', energyData)

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
			{ text: 'Energy', value: '.energy' },
			{ text: 'Emissions', value: '.emissions' },
			{ text: 'Market value', value: '.market_value' }
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

	<hr class="my-6" />

	<DataTable {columns} tableData={energyData} tableDict={energyDict} />
</main>
