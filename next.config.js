module.exports = {
    target: 'serverless',
    webpack: function(config) {
        config.module.rules.push({ test: /\.md$/i, use: 'raw-loader'})
        config.module.rules.push({ test: /\.xml$/i, use: 'xml-loader'})
        config.module.rules.push({ test: /\.(png|jpe?g|gif)$/i, use: 'file-loader'})
        return config
    }
}