module.exports = {
    webpack: {
        configure: {
            // See https://github.com/webpack/webpack/issues/6725
            module: {
                rules: [{
                    test: /\.wasm$/,
                    type: 'javascript/auto',
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[contenthash].[ext]'
                    }
                }]
            },
            resolve: {
                fallback: {
                    "crypto": false,
                    "path": false,
                    "fs": false
                }
            }
        }
    },
};