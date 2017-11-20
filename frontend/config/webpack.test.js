/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const helpers = require('./helpers');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

const nodeModules = helpers.root('node_modules');

module.exports = {

    devtool: 'inline-source-map',

    resolve: {

        extensions: ['.ts', '.js'],

        modules: [helpers.root('src'), nodeModules]
    },

    /**
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

        rules: [
            {enforce: 'pre', test: /\.js$/, use: 'source-map-loader', exclude: [nodeModules]},

            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-object-rest-spread'],
                        presets: [['es2015', { modules: false }]]
                    }
                }],
                exclude: [
                    nodeModules
                ]
            },

            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
                exclude: [
                    nodeModules
                ]
            },

            {
                test: /\.html$/,
                use: 'ng-cache-loader?-minimize',
                exclude: [
                    helpers.root('src/index.html')
                ]
            },

            {
                test: /\.less/,
                use: 'null-loader',
                include: [helpers.root('src')]
            },

            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: 'null-loader',
                exclude: [
                    /(glyphicons)/
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)(\?(.*))?$/,
                include: /node_modules/,
                use: 'null-loader'
            },

            /**
             * Instruments JS files with Istanbul for subsequent code coverage reporting.
             * Instrument only testing sources.
             *
             * See: https://github.com/deepsweet/istanbul-instrumenter-loader
             */
            {
                enforce: 'post',
                test: /\.ts$/,
                use: [{
                    loader: 'istanbul-instrumenter-loader',
                    options: {
                        esModules: true
                    }
                }],
                exclude: [
                    nodeModules,
                    /\.(spec|e2e)\.ts/
                ]
            }
        ]
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

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
            'ENV': JSON.stringify(ENV),
            'HMR': false,
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(ENV),
                'HMR': false,
            }
        }),

        new ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('src'), // location of your src
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),

        new LoaderOptionsPlugin({
            debug: false,
            options: {

            }
        })
    ]
};
