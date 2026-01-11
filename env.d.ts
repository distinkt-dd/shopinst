declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<object, object, unknown>
	export default component
}

declare module '@components/*'
declare module '@styles'
declare module '@ui/*'
declare module '@pages/*'
declare module '@router/*'

interface ImportMetaEnv {
	readonly VITE_API_ORIGIN: string
	readonly VITE_API_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}