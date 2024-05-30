<script>
	let { asr, stateParameter } = $props()
</script>

<h2>Runes State</h2>
<br />
Edit value to change state parameter
<br />
<input
	type="text"
	value={stateParameter}
	onchange={(e) => asr.go(null, { stateParameter: e.target.value })}
/>

<hr />

<uiView></uiView>
