const path = require('path')
const { mergeWithCustomize } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const commonConfig = require('./webpack.common.cjs')

module.exports = mergeWithCustomize(
    {
        customizeObject(a, b, key)  {
            if (key == 'module') {
                b.rules[0].use.options.plugins = [ require.resolve('react-refresh/babel') ]
            }

            return undefined 
        }
    }
)(
    {
        mode: 'development',
        devServer: {
            static: {
                directory: path.join(__dirname, '../public'),
            },
    
            compress: true,
            port: 3000,
            hot: true
        },

        module: {},

        plugins: [new ReactRefreshWebpackPlugin()]
    },
    
    commonConfig 
)