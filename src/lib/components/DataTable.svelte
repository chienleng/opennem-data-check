<script>
	// DataTable.svelte
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let el
	/** @type {String} */
	export let rowHeader = null
	/** @type {Array} */
	export let columns = []
	/** @type {Array} */
	export let tableData = []
	/** @type {Object} */
	export let tableDict = {}
	/** @type {Array} */
	export let selectedRows = null

	/**
	 * Returns display label for the column headers if exists
	 * @param {string} key - the property to retrieve from tableDict
	 * @return {string} display label
	 */
	function getLabel(key) {
		return tableDict[key] || key
	}

	function getValue(key, row) {
		if (typeof row[key] === 'undefined') return ''
		return row[key]
	}

	function handleClick(index) {
		dispatch('selectRow', { index })
	}
</script>

<div class="h-[77vh] overflow-auto rounded border">
	<table class="min-w-full table-auto" bind:this={el}>
		<thead class="bg-gray-50 text-right">
			<tr>
				{#if rowHeader}
					<th
						class="w-[230px] font-light text-left text-sm sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-95 py-1.5 px-1 backdrop-blur backdrop-filter"
					>
						{rowHeader}
					</th>
				{:else}
					<th
						class="font-light text-sm sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-95 py-1.5 px-1 backdrop-blur backdrop-filter"
					/>
				{/if}
				{#each columns as column}
					<th
						class="font-light text-sm border-l sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-95 py-1.5 px-2 backdrop-blur backdrop-filter"
					>
						{getLabel(column)}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each tableData as row, i}
				<tr
					class="border-b cursor-pointer"
					class:selected={selectedRows?.includes(i)}
					on:click={() => handleClick(i)}
				>
					{#if rowHeader}
						<th
							class="font-mono text-red-900 text-left text-xs sticky left-0 z-9 bg-gray-50 bg-opacity-95 whitespace-nowrap"
						>
							<div class="px-2">
								{getValue(rowHeader, row)}
							</div>
						</th>
					{:else}
						<th class="font-mono text-sm sticky left-0 z-9 bg-gray-50 bg-opacity-75">
							<div class="border-b border-r px-2">
								{i + 1}
							</div>
						</th>
					{/if}
					{#each columns as column}
						<td class="text-right font-mono text-sm border-b border-l px-2">
							<div data-tip={getLabel(column)}>
								{getValue(column, row)}
							</div>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	tr:hover td,
	tr:hover th {
		@apply bg-red-100;
	}

	tr.selected td,
	tr.selected th {
		@apply bg-red-300;
	}
</style>
