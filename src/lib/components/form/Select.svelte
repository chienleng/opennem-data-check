<script>
	export let label = ''
	export let name = ''
	export let options = []
	export let value = null
</script>

<div>
	<label for="location" class="block text-sm font-medium text-gray-700">{label}</label>
	<select
		id={name}
		{name}
		bind:value
		class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
	>
		{#each options as { value, text }}
			<option {value}>{text}</option>
		{/each}
	</select>
</div>
