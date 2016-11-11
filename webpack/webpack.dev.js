var loaders = require('./loaders');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
// var glob = require("glob");
module.exports = {
    entry: {
        //'vendor': ['./node_modules/d3//d3.js', './node_modules/angular/angular.js', './lib/lodash/lodash.min.js'],
        // app: 'app.js'
    },
    output: {
        path: 'dist',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map'
            // chunkFilename: '[id].chunk.js'
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.js', '.json', '.css', '.html']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin([{
                from: 'src/assets/',
                to: 'css'
            }, {
                from: './out/wp.js',
                to: ''
            }, {
                from: './bower_components/bootstrap/dist/css/bootstrap.min.css',
                to: 'css'
            }, {
                from: './bower_components/bento-modern/bootstrap/platform-theme.min.css',
                to: 'css'
            }, {
                from: './bower_components/bento-modern/components/platform-theme.min.css',
                to: 'css/bento-platform-theme.min.css'
            }, {
                from: './bower_components/bento-modern/flexgrid/platform-theme.min.css',
                to: 'css/flexgrid-platform-theme.min.css'
            }, {
                from: './bower_components/jquery/dist/jquery.min.js',
                to: 'js'
            }, {
                from: './bower_components/fef/fef.min.js',
                to: 'js'
            }, {
                from: './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                to: 'js'
            }, {
                from: './bower_components/bootstrap/dist/js/bootstrap.min.js',
                to: 'js'
            }, {
                from: './bower_components/bento-modern/components/bento-modern.min.js',
                to: 'js'
            }, {
                from: './node_modules/angular/angular.min.js',
                to: 'js'
            }, {
                from: './node_modules/angular-cookies/angular-cookies.min.js',
                to: 'js'
            }, {
                from: './node_modules/angular-animate/angular-animate.min.js',
                to: 'js'
            }, {
                from: './node_modules/angular-sanitize/angular-sanitize.min.js',
                to: 'js'
            }, {
                from: './node_modules/angular-touch/angular-touch.min.js',
                to: 'js'
            }, {
                from: './bower_components/fastclick/lib/fastclick.js',
                to: 'js'
            }, {
                from: './node_modules/angular-ui-router/release/angular-ui-router.min.js',
                to: 'js'
            }, {
                from: './node_modules/angular-translate/dist/angular-translate.min.js',
                to: 'js'
            }, {
                from: './node_modules/angulartics/dist/angulartics.min.js',
                to: 'js'
            }, {
                from: './lib/wijmo/controls/',
                to: 'js'
            }, {
                from: './lib/wijmo/styles/',
                to: 'css'
            }, {
                from: './bower_components/bento-modern/fonts/',
                to: 'fonts'
            }

        ]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9090,
            server: {
                baseDir: 'dist'
            },
            ui: false,
            online: false,
            notify: false
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        })
    ],
    module: {
        loaders: loaders
    }
};