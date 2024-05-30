import merge from 'deepmerge'
import { mount, unmount } from 'svelte'

export default function SvelteStateRendererFactory(defaultOptions = {}) {
	return function makeRenderer(stateRouter) {
		const asr = {
			makePath: stateRouter.makePath,
			stateIsActive: stateRouter.stateIsActive,
			go: stateRouter.go,
			getActiveState: stateRouter.getActiveState,
		}

		function render(context) {
			const { element: target, template, content } = context

			// eslint-disable-next-line no-undef
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

			return Promise.resolve(svelte)
		}

		return {
			render,
			reset: function reset(context) {
				const svelte = context.domApi
				const element = svelte.mountedToTarget

				svelte.asrOnDestroy()
				unmount(svelte)

				const renderContext = { element, ...context }

				return render(renderContext)
			},
			destroy: function destroy(svelte) {
				svelte.asrOnDestroy()
				unmount(svelte)
				return Promise.resolve()
			},
			getChildElement: function getChildElement(svelte) {
				const element = svelte.mountedToTarget
				const child = element.querySelector(`uiView`)
				return Promise.resolve(child)
			},
		}
	}
}
