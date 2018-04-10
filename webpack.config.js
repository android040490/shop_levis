"use strict;"
const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: [
        "./app"
        // "/node_modules/bootstrap/dist/js/bootstrap"
    ],
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js"
    }, //
    watch: true,

    
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.sass$/, // scss
                loader: ExtractTextPlugin.extract({
                    use: ["css-loader", "postcss-loader", "sass-loader"], // npm install scss-loader --save-dev
                })
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 32768,
                            publicPath: './',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("main.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })

    ],
    resolve: {
        extensions: [".js"]
    },
    devServer: {
        inline:true,
        port: 10000
      }
}