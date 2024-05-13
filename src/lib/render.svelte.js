import merge from 'deepmerge'
import {mount, unmount} from 'svelte'

export default function SvelteStateRendererFactory(defaultOptions = {}) {
	return function makeRenderer(stateRouter) {
		const asr = {
			makePath: stateRouter.makePath,
			stateIsActive: stateRouter.stateIsActive,
			go: stateRouter.go,
			getActiveState: stateRouter.getActiveState,
		}

		async function render(context) {
			const { element: target, template, content } = context

			const mergedProps = $state(Object.assign(content, defaultOptions.props, { asr }))

			const rendererSuppliedOptions = merge(defaultOptions, {
				target,
				props: mergedProps,
			})

			let svelte

			if (typeof template === `function`) {
				svelte = mount(template, rendererSuppliedOptions)
			} else {
				const options = merge(rendererSuppliedOptions, template.options)

				svelte = mount(template.component, options)
			}

			function onRouteChange() {
				svelte.asr = asr
			}

			stateRouter.on(`stateChangeEnd`, onRouteChange)

			svelte.asrOnDestroy = () => stateRouter.removeListener(`stateChangeEnd`, onRouteChange)
			svelte.mountedToTarget = target

			return svelte
		}

		return {
			render,
			reset: async function reset(context) {
				const svelte = context.domApi
				const element = svelte.mountedToTarget

				svelte.asrOnDestroy()
				// svelte.$destroy()
				unmount(svelte)

				const renderContext = Object.assign({ element }, context)

				return render(renderContext)
			},
			destroy: async function destroy(svelte) {
				svelte.asrOnDestroy()
				// svelte.$destroy()
				unmount(svelte)
			},
			getChildElement: async function getChildElement(svelte) {
				const element = svelte.mountedToTarget
				const child = element.querySelector(`uiView`)
				return child
			},
		}
	}
}