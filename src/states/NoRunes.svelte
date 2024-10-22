<svelte:options runes={false} />

<script lang="ts">
	export let asr: any
	export let count = 1

	export let stateParameter: string
</script>

<h2>No Runes State</h2>

<button onclick={() => (count += 1)}>Count ({count})</button>

<input
	type="text"
	bind:value={stateParameter}
	onchange={() => asr.go(null, { stateParameter })}
/>
