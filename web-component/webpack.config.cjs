// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// module.exports = {
//     entry: {
//         main: path.resolve(__dirname, './src/index.js')
//     },
//     mode: 'production',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'interactive-web-component.js',
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             title: 'Interactive Web Component Test Page',
//             template: path.resolve(__dirname, './src/template.html'),
//             filename: 'index.html',
//         }),
//         new CleanWebpackPlugin(),
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: 'babel-loader',
//                 exclude: /node_modules/,
//             }
//         ]
//     }
// }