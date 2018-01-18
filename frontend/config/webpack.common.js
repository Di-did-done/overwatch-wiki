const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const METADATA = {
    title: 'PT-MultiScanner',
    baseUrl: '/'
};

const appConfig = {
    root: 'src',
    main: 'main.ts',
    polyfills: 'polyfills.ts',
    vendor: 'vendor.ts',
    environments: '',
    outDir: 'dist'
};

const nodeModules = helpers.root('node_modules');

let entryPoints = {
    main: helpers.root(appConfig.root, appConfig.main),
    polyfills: helpers.root(appConfig.root, appConfig.polyfills),
    vendor: helpers.root(appConfig.root, appConfig.vendor),
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

    context: helpers.root(),
    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: entryPoints,

    output: {
        path: helpers.root('dist')
    },

    /*
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['.ts', '.js', 'json'],

        // An array of directory names to be resolved to the current directory
        modules: [nodeModules, helpers.root('src')]
    },

    /*
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

        rules: [
            {enforce: 'pre', test: /\.js$/, use: 'source-map-loader', exclude: [ nodeModules ]},

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
                    /\.(spec|e2e)\.js$/,
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
                test: /\.json$/,
                exclude: [ nodeModules ],
                use: 'file-loader?name=[path][name].[ext]?[hash]'
            },
            {test: /\.(jpg|png|gif|ico)$/, use: 'url-loader?limit=10000'},

            {test: /\.(eot|otf|ttf|woff|woff2)$/, use: 'url-loader?limit=10000&outputPath=assets/fonts/'},
            {test: /\.(svg)$/, use: 'file-loader?outputPath=assets/images/'},

            /*
             * Typescript loader support for .ts and Angular 2 async routes via .async.ts
             * Replace templateUrl and stylesUrl with require()
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             */
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.json'
                        }
                    },
                    'angular-router-loader'
                ],
                exclude: [
                    nodeModules,
                    /\.(spec|e2e)\.ts$/
                ]
            }

        ]
    },

    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

        new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),

        // This enables tree shaking of the vendor modules
        new CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: module => /node_modules/.test(module.resource)
        }),

        new CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),

        new ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        /**
         * Plugin: ContextReplacementPlugin
         * Description: Provides context to Angular's use of System.import
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
         * See: https://github.com/angular/angular/issues/11580
         */
        new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src')
        ),

        /*
         * Plugin: CopyWebpackPlugin
         * Description: Copy files and directories in webpack.
         *
         * Copies project static assets.
         *
         * See: https://www.npmjs.com/package/copy-webpack-plugin
         */
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'
        }]),

        /*
         * Plugin: HtmlWebpackPlugin
         * Description: Simplifies creation of HTML files to serve your webpack bundles.
         * This is especially useful for webpack bundles that include a hash in the filename
         * which changes every compilation.
         *
         * See: https://github.com/ampedandwired/html-webpack-plugin
         */
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            title: METADATA.title,
            chunksSortMode: 'dependency',
            metadata: METADATA,
            inject: 'body'
        }),

        /*
         * Plugin: ScriptExtHtmlWebpackPlugin
         * Description: Enhances html-webpack-plugin functionality
         * with different deployment options for your scripts including:
         *
         * See: https://github.com/numical/script-ext-html-webpack-plugin
         */
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        })
    ]
};
