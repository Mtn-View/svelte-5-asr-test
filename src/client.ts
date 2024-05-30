import createStateRouter from 'abstract-state-router'
import createSvelteRenderer from '$lib/render.svelte'
import Runes from './states/Runes.svelte'
import Root from './states/Root.svelte'

let asr

asr = createStateRouter(createSvelteRenderer(), document.querySelector('body'))

asr.addState({
	name: 'root',
	route: '/',
	defaultChild: 'runes',
	template: Root,
	resolve(data, parameters) {
		return Promise.resolve()
	}
})

asr.addState({
	name: 'root.runes',
	route: '/runes',
	defaultChild: 'child',
	template: Runes,
	querystringParameters: ['stateParameter'],
	resolve(data, parameters) {
		console.log('root.runes.resolve', parameters)
		return Promise.resolve({
			stateParameter: parameters?.stateParameter ?? 'bar'
		})
	}
})
asr.addState({
	name: 'root.runes.child',
	route: '/child',
	template: Runes,
	// querystringParameters: ['stateParameter'],
	resolve(data, parameters) {
		console.log('root.runes.child.resolve', parameters)
		return Promise.resolve({
			stateParameter: parameters?.stateParameter ?? 'baz'
		})
	}
})
asr.evaluateCurrentRoute('root')
