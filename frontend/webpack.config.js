const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/index.tsx",
    },
    mode: "production",
    target: "web",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
        clean: true,
        assetModuleFilename: '[name].[ext]'
    },
    devtool: 'inline-source-map',
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
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".jsx"],
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
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader","sass-loader"],
            },
            {
                test: /\.(png|svg)$/i,
                type: "asset/resource",
            },
        ],
    },
};
