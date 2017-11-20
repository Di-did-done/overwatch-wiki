const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});

const helpers = require('./helpers');
const commonConfig = require('./webpack.common.js');

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const autoprefixer = require('autoprefixer');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3333;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(commonConfig, {

    devtool: 'eval',

    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader?sourceMap',
                    'less-loader?sourceMap'
                ],
                include: [helpers.root('src')]
            }
        ]
    },

    plugins: [

        new ProgressPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        new DllBundlesPlugin({
            bundles: {
                polyfills: [
                    'core-js'
                ],
                vendor: [
                    'jquery',
                    'angular',
                    'angular-sanitize',
                    'angular-cookies',
                    'angular-animate',
                    'angular-aria',
                    'angular-material',
                    'lodash',
                    'angular-ui-router',
                    'moment',
                    {
                        name: 'moment',
                        path: 'moment/locale/ru'
                    }
                ]
            },
            dllDir: helpers.root('dist-dll'),
            webpackConfig: webpackMergeDll(commonConfig, {
                devtool: 'source-map',
                plugins: [
                    new webpack.ProvidePlugin({
                        $: 'jquery',
                        jquery: 'jquery',
                        jQuery: 'jquery',
                        'window.jQuery': 'jquery'
                    }),
                ]
            })
        }),

        new AddAssetHtmlPlugin([
            { filepath: `dist-dll/${DllBundlesPlugin.resolveFile('polyfills')}` },
            { filepath: `dist-dll/${DllBundlesPlugin.resolveFile('vendor')}` }
        ]),

        /**
         * Plugin: DefinePlugin
         * Description: Define free variables.
         * Useful for having development builds with debug logging or adding global constants.
         *
         * Environment helpers
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
         */
        // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
        new DefinePlugin({
            'ENV': JSON.stringify(METADATA.ENV),
            'HMR': METADATA.HMR,
            'process.env': {
                'ENV': JSON.stringify(METADATA.ENV),
                'NODE_ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
            }
        }),

        /**
         * Plugin: NamedModulesPlugin (experimental)
         * Description: Uses file names as module name.
         *
         * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
         */
        new NamedModulesPlugin(),

        new LoaderOptionsPlugin({
            debug: true,
            options: {
                metadata: METADATA,
                /**
                 * Static analysis linter for TypeScript advanced options configuration
                 * Description: An extensible linter for the TypeScript language.
                 *
                 * See: https://github.com/wbuchwalter/tslint-loader
                 */
                tslint: {
                    emitErrors: true,
                    failOnHint: false,
                    resourcePath: helpers.root('src')
                },
                postcss: function () {
                    return [
                        autoprefixer({ browsers: ['last 2 versions'] })
                    ];
                }
            }
        })
    ],

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
        hot: true,
        inline: true,
        contentBase: './src',
        port: METADATA.port,
        host: METADATA.host,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        stats: 'minimal',
        proxy: {
            '/api/*': 'http://localhost:1338'
        }
    }

});
