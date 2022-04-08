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
	import Home from '$lib/components/Home.svelte'

	export let energy = []

</script>

<Home {energy} />
