<script>
	import { onMount } from 'svelte'
	import { transformToEnergyDict, transformToEnergyData, filterByType } from '$lib/modules/parser'
	import { fetchData } from '$lib/modules/api'
	import regionOptions from '$lib/constants/regions'
	import FormSelect from '$lib/components/form/Select.svelte'
	import DataTable from '$lib/components/DataTable.svelte'

	let energy = null
	let baseUrl = ''
	let selectedRegion = 'NEM'
	let selectedTimeRange = '2022'
	let selectedType = '.energy'
	let tableData = []
	let selectedRowsSet = new Set()
	let selectedRows = []
	let datatableEl

	/** @type {{}} */
	$: energyDict = energy ? transformToEnergyDict(energy.data) : {}

	/** @type {[]} */
	$: mappedData = energy ? transformToEnergyData(energy.data)[1] : []
	$: dataKeys = Object.keys(energyDict)
	$: for (const [key, value] of mappedData) {
		const obj = {
			datetime: value.zonedDateTime
		}

		dataKeys.forEach((k) => {
			const keyValue = value[k]?.value

			obj[k] = keyValue
		})

		tableData = [...tableData, obj]
	}
	$: columns = tableData.length ? filterByType(selectedType, dataKeys) : []

	$: if (baseUrl) {
		fetchData(baseUrl, selectedRegion, selectedTimeRange, selectedType).then((r) => {
			tableData = []
			selectedRowsSet.clear()
			selectedRows = []
			energy = r
		})
	}

	$: console.log('energy', energy)
	$: console.log('columns', columns)
	$: console.log('tableData', tableData)
	$: console.log('columns', columns)
	$: console.log('energyDict', energyDict)

	onMount(() => (baseUrl = window.location.href))

	function handleRowSelect(event) {
		const index = event.detail.index

		if (selectedRowsSet.has(index)) {
			selectedRowsSet.delete(index)
		} else {
			selectedRowsSet.add(index)
		}

		const arr = []
		for (const [key, value] of selectedRowsSet.entries()) {
			arr.push(value)
		}

		selectedRows = arr
	}

	function handleCopy() {
		const headerCols = ['datetime', ...columns]
		const rows = []
		console.log('tableContents', headerCols, tableData)

		tableData.forEach((d) => {
			let row = []
			headerCols.forEach((k, i) => {
				row.push(d[k])
			})
			rows.push(row)
		})

		const csv =
			'data:text/csv;charset=utf-8,' +
			headerCols.join(',') +
			'\n' +
			rows.map((r) => r.join(',')).join('\n')

		console.log('csv', csv)

		var encodedUri = encodeURI(csv)
		window.open(encodedUri)
	}
</script>

<main class="p-6">
	<header class="flex gap-2 items-center justify-center">
		<FormSelect label="Region" name="region" options={regionOptions} bind:value={selectedRegion} />
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
		<FormSelect
			label="Data"
			name="datafile"
			options={[
				{ text: '2022', value: '2022' },
				{ text: '2021', value: '2021' },
				{ text: '2020', value: '2020' },
				{ text: '2019', value: '2019' }
			]}
			bind:value={selectedTimeRange}
		/>
	</header>

	<hr class="my-6" />

	{#if tableData.length}
		<button
			on:click={handleCopy}
			class="mb-3 rounded border px-2 py-1 bg-slate-100 hover:bg-slate-50">Download as CSV</button
		>
		<DataTable
			bind:el={datatableEl}
			{columns}
			{tableData}
			{selectedRows}
			rowHeader="datetime"
			tableDict={energyDict}
			on:selectRow={handleRowSelect}
		/>
	{/if}
</main>
