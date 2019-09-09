require('dotenv').config()
const webpack = require('webpack')
module.exports = {
	distDir: '_next',
	webpack: (config) => {
		config.plugins.push(
			new webpack.EnvironmentPlugin(process.env)
		)
		return config
	}
}
