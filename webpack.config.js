module.exports = {
    entry: './public/app/index.js',
    output: {
        filename: 'index.js',
        path: './public/www'
    },
    devtool: 'cheap-module-eval-source-map',
    module:{
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
}
