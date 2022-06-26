<table class="">
  <thead class="">
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
    {#each tableData as row, i}
      <tr>
        <th>{i + 1}</th>
        {#each Object.entries(row) as [key, value]}
          <td>
            <div data-tip={getLabel(key)}>
              {value}
            </div>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

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
</script>
