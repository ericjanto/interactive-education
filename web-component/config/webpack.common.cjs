const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths.cjs')

module.exports = {
    entry: {
        main: [paths.src + '/index.js'],
        host: { import: paths.src + '/index.js', filename: '../../website/public/interactive-video-component.js' }
    },
    output: {
        path: paths.build,
        filename: 'interactive-video-component.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Interactive Web Component Test Page',
            template: paths.src + '/template.html',
            filename: 'index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            }
        ]
    },
    resolve: {
        modules: [paths.src, 'node_modules'],
        extensions: ['.js', '.json'],
    }
}