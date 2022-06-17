//'use strict'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 3 });

module.exports = {
	performance: {
		hints: 'warning',
		//入口起点的最大体积 整数类型（以字节为单位）
		maxEntrypointSize: 50000000,
		//生成文件的最大体积 整数类型（以字节为单位 300k）
		maxAssetSize: 30000000,
		//只给出 js 文件的性能提示
		assetFilter: function (assetFilename) {
			return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
		}
	},

	// 入口起点
	entry: {
		app: [
			path.join(__dirname, '../src/index.js')
		],
		vendor: ['react', 'react-dom', 'react-router-dom', 'antd']
	},

	// 输出
	output: {
		//publicPath:'./',
		path: path.resolve(__dirname, '../dist'),
		chunkFilename: '[name].[chunkHash:8].min.js',
		filename: "[name].[hash:8].js",
	},

	// 解析
	resolve: {
		alias: { //配置绝对路径
			'assets': path.resolve(__dirname, '../src/assets'),
			'components': path.resolve(__dirname, '../src/components'),
			'config': path.resolve(__dirname, '../src/config'),
			'pages': path.resolve(__dirname, '../src/pages'),
			'routers': path.resolve(__dirname, '../src/routers'),
			'store': path.resolve(__dirname, '../src/store'),
			'tools': path.resolve(__dirname, '../src/tools'),
		},
		extensions: ['.js', '.jsx']
	},

	// loader
	module: {
		rules: [{
			test: /\.js|jsx$/,
			exclude: /node_modules/, // 屏蔽不需要处理的文件（文件夹）（可选）
			//loader: 'babel-loader'
			use: ['happypack/loader?id=babel']
		},
		{
			test: /\.css$/,
			//use: ['style-loader', 'css-loader']
			use: ['happypack/loader?id=css']
		},
		{
			test: /\.less$/,
			//use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
			use: ['happypack/loader?id=less']
		},
		{
			test: /\.(jpg|jpeg|png|gif|eot|svg|ttf|woff)/,
			exclude: /node_modules/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'images/[hash:8].[name].[ext]'
				}
			}],
		}
		]
	},

	// 插件
	plugins: [
		new HappyPack({
			id: 'less',
			loaders: [
				'style-loader',
				'css-loader',
				'less-loader'
			],
			verbose: true,
			threadPool: happyThreadPool
		}),

		new HappyPack({
			id: 'css',
			loaders: [
				'style-loader',
				'css-loader'
			],
			verbose: true,
			threadPool: happyThreadPool
		}),

		new HappyPack({
			id: 'babel',
			loaders: [{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true
				}
			}],
			verbose: true,
			threadPool: happyThreadPool
		}),

		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, '../public/index.html'),
			minify: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true
			},
			inject: 'body'
		})
	]
}