const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './index.js',  // Arquivo principal JS
    output: {
        filename: 'bundle.js',  // Nome do arquivo final JS
        path: path.resolve(__dirname, 'dist'),  // Pasta de saída
        clean: true,  // Garante que a pasta seja limpa antes do build
    },
    mode: 'development',
    devtool: 'source-map', // Facilita debugging
    devServer: {
        static: './dist', // Servir arquivos de build
        hot: true, // Habilita live reload
        open: true, // Abre automaticamente no navegador
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Transpilação de JS
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/, // Processamento de SCSS
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/, // Processamento de CSS puro
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // Gera automaticamente HTML
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css' // Gera um arquivo CSS separado
        }),
        new CleanWebpackPlugin()
    ]
};
