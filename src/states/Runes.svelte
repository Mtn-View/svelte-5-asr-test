<script>
	let { asr, stateParameter } = $props()
</script>

<h2>Runes State</h2>
<br />
Edit value to change state parameter
<br />
<input
	type="text"
	bind:value={stateParameter}
	onchange={() => asr.go(null, { stateParameter })}
/>

<hr />

<uiView></uiView>
