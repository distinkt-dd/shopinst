import postcssPxToRem from 'postcss-pxtorem'

export default ({ env }) => {
	const isProd = env === 'development'
	const plugins = []

	if (isProd) {
		plugins.push(
			postcssPxToRem({
				rootValue: 16,
				propList: ['*'],
				mediaQuery: true,
				replace: true,
				minPixelValue: 0,
			})
		)
	}

	return { plugins }
}
