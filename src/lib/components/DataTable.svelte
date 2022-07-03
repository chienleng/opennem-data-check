<script>
	// DataTable.svelte

	/** @type {Array} */
	export let columns = []
	/** @type {Array} */
	export let tableData = []
	/** @type {Object} */
	export let tableDict = {}

	/**
	 * Returns display label for the column headers if exists
	 * @param {string} key - the property to retrieve from tableDict
	 * @return {string} display label
	 */
	function getLabel(key) {
		return tableDict[key] || key
	}

	function getValue(key, row) {
		return row[key] || ''
	}
</script>

<div class="h-[500px] overflow-auto rounded border">
	<table class="min-w-full table-auto border-collapse">
		<thead class="bg-gray-50 text-right">
			<tr>
				<th
					class="font-light text-sm sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-1.5 px-1 backdrop-blur backdrop-filter"
				/>
				{#each columns as column}
					<th
						class="font-light text-sm border-l sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-1.5 px-2 backdrop-blur backdrop-filter"
					>
						{getLabel(column)}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each tableData as row, i}
				<tr class="border-b">
					<th class="font-mono text-sm sticky left-0 z-9 bg-white border-b">{i + 1}</th>
					{#each columns as column}
						<td class="text-right font-mono text-sm border-l px-2">
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
