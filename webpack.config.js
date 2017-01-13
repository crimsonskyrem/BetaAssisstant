module.exports = {
    entry: './public/app/index.js',
    output: {
        filename: 'bundle.js',
        path: './public/www'
    },
    module:{
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }
}
