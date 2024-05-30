<script>
	export let stateParameter
	export let asr
</script>

Hello from a child state
<br />
Edit value to change state parameter
<br />
<input
	type="text"
	value={stateParameter}
	on:change={(e) => {
		asr.go(null, { stateParameter: e.target.value })
	}}
/>

<hr />

<uiView></uiView>
