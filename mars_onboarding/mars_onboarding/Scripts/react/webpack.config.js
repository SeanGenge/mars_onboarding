module.exports = {
	mode: "development",
	context: __dirname,
	entry: {
		customer: "./customer/Customer.js",
		product: "./product/Product.js",
		store: "./store/Store.js",
		sale: "./sale/Sale.js"
	},
	output: {
		path: __dirname + "/dist",
		filename: "[name]_bundle.js"
	},
	watch: true,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['babel-preset-env', 'babel-preset-react']
					}
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader'
			},
			{
				test: /\.css$/,
				loader: 'css-loader',
				query: {
					modules: true,
					localIdentName: '[name]__[local]___[hash:base64:5]'
				}
			}
		]
	}
}