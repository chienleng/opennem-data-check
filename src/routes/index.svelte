<script context="module">
	export async function load({ fetch }) {
		const url = 'https://data.opennem.org.au/v3/stats/au/NEM/power/7d.json'
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
	export let energy = []

	function parseData(data) {
		const firstItem = data[0]
		const parsed = firstItem.history.data.map((d) => {
			return {
				[firstItem.id]: d
			}
		})

		for (let i = 1; i < data.length; i++) {
			const item = data[i]
			const history = item.history.data

			for (let j = 0; j < history.length; j++) {
				const d = history[j]
				parsed[j][item.id] = d
			}
		}

		return parsed
	}

	$: console.log(energy)
	$: console.log(data)

	$: stats = {
		code: energy.code,
		created: energy.created_at,
		network: energy.network,
		type: energy.type,
		version: energy.version
	}

	$: data = parseData(energy.data)
	$: columns = Object.keys(data[0])
</script>

<div class="p-5">
	<h1>Data check</h1>

	<div class="stats stats-vertical lg:stats-horizontal shadow">
		{#each Object.entries(stats) as [key, value]}
			<div class="stat">
				<div class="stat-title">{key}</div>
				<div class="stat-value text-lg">{value}</div>
			</div>
		{/each}
	</div>

	<div class="overflow-x-auto">
		<table class="table table-compact border-separate" style="border-spacing: 0">
			<thead class="bg-gray-50">
				<tr>
					<th
						scope="col"
						class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75"
					/>
					{#each columns as column}
						<th
							scope="col"
							class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75"
						>
							{column}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as row, i}
					<tr>
						<th>{i + 1}</th>
						{#each Object.values(row) as value}
							<td>{value}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
