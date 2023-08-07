const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/index.tsx",
    },
    mode: "production",
    target: "web",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.[contenthash].js",
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "build"),
        },
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true,
        compress: true
    },
    plugins: [
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,
                output: {
                    comments: false,
                },
            },
            extractComments: false,
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico"
        }),
    ],
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".jsx"],
        alias: {
            globalize$: path.resolve( __dirname, "node_modules/globalize/dist/globalize.js" ),
            globalize: path.resolve(__dirname, "node_modules/globalize/dist/globalize"),
            cldr$: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr.js"),
            cldr: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr")
          },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            { 
                test: /\.css$/,
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" }]
              },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192, // Adjust the limit based on your needs
                    fallback: 'file-loader',
                    name: 'images/[name].[hash].[ext]' // Output path and filename pattern
                }
            },
        ],
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [new TerserPlugin()],
        usedExports: true,
        sideEffects: true,
    },
};