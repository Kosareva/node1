var path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        task1: './js/task1/index.mjs',
        task2: './js/task2/index.mjs',
    },
    target: 'node',
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                type: 'javascript/auto',
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
