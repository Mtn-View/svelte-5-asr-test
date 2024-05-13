<script>
	export let stateParameter;
	export let asr;
	export let snippet;

	$: console.log(asr);
</script>

Hello from a child state
{stateParameter}

<input
	type="text"
	value={stateParameter}
	on:change={(e) => {
		asr.go(null, { stateParameter: e.target.value });
	}}
/>

{#if snippet}
	{@render snippet()}
{/if}

<hr />

<uiView></uiView>
