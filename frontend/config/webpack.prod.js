const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const helpers = require('./helpers');
const commonConfig = require('./webpack.common.js');

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const autoprefixer = require('autoprefixer');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

const METADATA = webpackMerge(commonConfig.metadata, {
    ENV: ENV,
    HMR: false
});

module.exports = webpackMerge(commonConfig, {

    devtool: 'source-map',

    output: {
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },

    module: {
        rules: [
            {
                // style-loader: добавляет CSS в DOM используя тег <script>
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2
                            }
                        },
                        'postcss-loader',
                        'less-loader'
                    ]
                })
            },
        ]
    },

    plugins: [

        new ExtractTextPlugin('[name].[contenthash].css'),

        new webpack.NoEmitOnErrorsPlugin(),

        /**
         * Plugin: WebpackMd5Hash
         * Description: Plugin to replace a standard webpack chunkhash with md5.
         *
         * See: https://www.npmjs.com/package/webpack-md5-hash
         */
        new WebpackMd5Hash(),

        /**
         * Plugin: DefinePlugin
         * Description: Define free variables.
         * Useful for having development builds with debug logging or adding global constants.
         *
         * Environment helpers
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
         */
        // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
        new DefinePlugin({
            'ENV': JSON.stringify(METADATA.ENV),
            'HMR': METADATA.HMR,
            'process.env': {
                'ENV': JSON.stringify(METADATA.ENV),
                'NODE_ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
            }
        }),

        /*
         * Plugin: CopyWebpackPlugin
         * Description: Copy files and directories in webpack.
         *
         * Copies project static assets.
         *
         * See: https://www.npmjs.com/package/copy-webpack-plugin
         */
        new CopyWebpackPlugin([{
            from: 'src/favicon.ico',
            to: 'favicon.ico'
        }]),

        /**
         * Plugin: UglifyJsPlugin
         * Description: Minimize all JavaScript output of chunks.
         * Loaders are switched into minimizing mode.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
         */
        // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
        new UglifyJsPlugin({
            sourceMap: false
        }),

        new LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                postcss: function() {
                    return [
                        autoprefixer({ browsers: ['last 2 versions'] })
                    ];
                }
            }
        })
    ]
});
