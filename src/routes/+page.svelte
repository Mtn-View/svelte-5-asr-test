<script>
	import State from './State.svelte';

	import { onMount } from 'svelte';
	import createStateRouter from 'abstract-state-router';
	import createSvelteRenderer from '$lib/render.svelte';

	let asr;

	onMount(() => {
		asr = createStateRouter(createSvelteRenderer(), document.querySelector('#state'));
		asr.addState({
			name: 'state',
			route: '/state',
			defaultChild: 'child',
			template: State,
			querystringParameters: ['stateParameter'],
			resolve(data, parameters) {
				return Promise.resolve({
					stateParameter: parameters?.stateParameter ?? 'bar',
					snippet: parent
				});
			}
		});
		asr.addState({
			name: 'state.child',
			route: '/child',
			template: State,
			// querystringParameters: ['stateParameter'],
			resolve(data, parameters) {
				return Promise.resolve({
					stateParameter: parameters?.stateParameter ?? 'baz',
					snippet: child
				});
			}
		});
		asr.evaluateCurrentRoute('state');
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div id="state"></div>

{#snippet parent()}
	Hello! This is the parent snippet.
{/snippet}

{#snippet child()}
	Hello! This is the child snippet.
{/snippet}
