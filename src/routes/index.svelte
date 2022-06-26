<script context="module">
	export async function load({ fetch }) {
		const url = 'https://data.opennem.org.au/v3/stats/au/NEM/energy/2021.json'
		const response = await fetch(url)

		return {
			status: response.status,
			props: {
				energy: response.ok && (await response.json())
			}
		}
	}
</script>

<script>
	import { transformToEnergyDict, transformToEnergyData } from '$lib/modules/parser'
	import regionOptions from '$lib/constants/regions'
	import FormSelect from '$lib/components/form/Select.svelte'
	import DataTable from '$lib/components/DataTable.svelte'

	export let energy = null
	let selectedRegion = 'nem'
	let selectedData = '2022'
	let selectedType = 'energy'

	$: console.log(energy)

	$: stats = {
		code: energy.code,
		created: energy.created_at,
		network: energy.network,
		type: energy.type,
		version: energy.version
	}

	/** @type {Array} */
	$: energyData = transformToEnergyData(energy.data)
	/** @type {Object} */
	$: energyDict = transformToEnergyDict(energy.data)
	/** @type {Array} */
	$: columns = Object.keys(energyData[0])
</script>

<main class="p-6">
	<header>
		<h1>Data check</h1>
	</header>

	<FormSelect
		label="Type"
		name="type"
		options={[{ text: 'Energy', value: 'energy' }]}
		bind:value={selectedType}
	/>
	<FormSelect label="Region" name="region" options={regionOptions} bind:value={selectedRegion} />
	<FormSelect
		label="Data"
		name="datafile"
		options={[
			{ text: '7d', value: '7d' },
			{ text: '2022', value: '2022' }
		]}
		bind:value={selectedData}
	/>

	<!-- <DataTable {columns} tableData={energyData} tableDict={energyDict} /> -->
</main>
