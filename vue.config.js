if (!process.env.API_URL && process.env.NODE_ENV === 'development') {
	console.log(`
⚠️   No API URL passed. Using the demo API as a fallback.
`);
}
const proxyMiddleware = require('http-proxy-middleware');

const PROXY = 'https://worksdomain.nl/public';

module.exports = {
	lintOnSave: false,
	publicPath: process.env.NODE_ENV === 'production' ? '' : '/admin/',

	devServer: {
		index: '',
		serveIndex: false,
		historyApiFallback: false,
		progress: false,
		proxy: {
			'^/': {
				target: PROXY,
				ws: false,
				changeOrigin: true
			}
		},
		staticOptions: {
			redirect: false
		},
		after: app => app.use('/', proxyMiddleware(PROXY))
	},

	// There are so many chunks (from all the interfaces / layouts) that we need to make sure to not
	// prefetch them all. Prefetching them all will cause the server to apply rate limits in most cases
	chainWebpack: config => {
		config.plugins.delete('prefetch');

		if (process.env.NODE_ENV === 'development') {
			config.output.filename('[name].[hash].js').end();
		}

		// NOTE: This should be removed when we have main.js refactored to TypeScript
		config
			.entry('app')
			.clear()
			.add('./src/main.js')
			.end();
	}
};
