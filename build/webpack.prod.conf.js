//'use strict'
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
	// 模式
	mode: "production",

	// 调试工具
	//devtool: '#source-map',
	// 输出
	output: {
		//publicPath:'./',
		path: path.resolve(__dirname, '../dist'),
		chunkFilename: '[name].[chunkHash:8].min.js',
		filename: "[name].[hash:8].js",
	},

	// 插件
	plugins: [
		new webpack.HashedModuleIdsPlugin(),
		new ParallelUglifyPlugin({
			cacheDir: '.uglify-cache',
			warnings: false,
			include: /..\/dist/,
			parallel: true,
			ecma: 8,
			sourceMap: false,
			uglifyJS: {
				output: {
					beautify: false, // 最紧凑的输出
					comments: false, // 删除所有的注释
				},
				compress: {
					drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
					collapse_vars: true, // 内嵌定义了但是只用到一次的变量
					reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
				}
			}
		})
	],

	// 代码分离相关
	optimization: {
		nodeEnv: 'production',
		runtimeChunk: {
			name: 'manifest'
		},
		splitChunks: {
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: false,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'initial',
				}
			}
		}
	}
});