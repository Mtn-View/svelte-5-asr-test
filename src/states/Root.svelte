<script>
	let { asr } = $props()

	let mounted = $state(false)

	$effect(() => {
		asr
		if (mounted) {
			console.log('asr changed!')
		} else {
			console.log('root mounted')
			mounted = true
		}
	})
</script>

<h1>Welcome to the Svelte 5 ASR demo!</h1>

Go to:
<ul>
	<li><a href={asr.makePath('root.runes')}>Runes State</a></li>
	<li><a href={asr.makePath('root.no-runes')}>No Runes State</a></li>
</ul>

<hr />

<uiView></uiView>
