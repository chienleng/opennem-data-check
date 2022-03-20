<script>
	export let energy = null

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

  function parseDict(data) {
    const dict = {}
    
    data.forEach(d => {
      dict[d.id] = d.fuel_tech
    })

    return dict
  }

  function getLabel(key) {
    return energyDict[key] || key
  }

	$: console.log(energy)
	$: console.log(energyData)
  $: console.log(energyDict)

	$: stats = {
		code: energy.code,
		created: energy.created_at,
		network: energy.network,
		type: energy.type,
		version: energy.version
	}

	$: energyData = parseData(energy.data)
  $: energyDict = parseDict(energy.data)
	$: columns = Object.keys(energyData[0])
</script>

<header class="p-5">
  <h1>Data check </h1>

  <div class="stats stats-vertical lg:stats-horizontal shadow">
    {#each Object.entries(stats) as [key, value]}
      <div class="stat">
        <div class="stat-title">{key}</div>
        <div class="stat-value text-lg">{value}</div>
      </div>
    {/each}
  </div>
</header>


<div class="overflow-x-auto">
  <table class="table table-compact">
    <thead class="bg-gray-50">
      <tr>
        <th />
        {#each columns as column}
          <th>
            {getLabel(column)}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each energyData as row, i}
        <tr>
          <th>{i + 1}</th>
          {#each Object.entries(row) as [key, value]}
            <td>
              <div class="tooltip" data-tip={getLabel(key)}>
                {value}
              </div>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
