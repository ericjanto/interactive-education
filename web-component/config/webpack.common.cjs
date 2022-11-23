const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack');
const process = require("process");

const paths = require('./paths.cjs')

const isDevelopment = process.env.NODE_ENV === "development";

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
        new DefinePlugin({
            API_URL: JSON.stringify(
                isDevelopment
                  ? "http://localhost:3000"
                  : "https://interactive-education.vercel.app/",
              ),
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