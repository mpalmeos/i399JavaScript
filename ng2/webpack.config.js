const path = require('path');

module.exports = {

    entry: {
        polyfills: './ui/app/polyfills.ts',
        app: './ui/app/main.ts'
    },

    output: {
        path: path.resolve(__dirname, 'ui/build'),
        publicPath: '/ui/build/',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ],
        exprContextCritical: false
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    }

};