var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
const moment = require('moment');
const childProcess = require('child_process');
const GIT_REVISION = childProcess.execSync('git rev-parse HEAD').toString().trim();
// console.log(process.env.PROD_SERVER);
// process.env.PROD_SERVER='172.20.4.89:8080'
const DEFAULT_PROD_SERVER = 'ybz.yonyoucloud.com';

// 获取版本
const packageJSON = require('./package.json');
module.exports = {
    devtool: 'source-map',
    entry: {
        common: ['react', 'react-dom', 'react-router'],
        index: [
            'babel-polyfill',
            './src/index'
        ]
    },
    output: {
        path: path.join(__dirname, 'client/js'),
        // publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: path.join(__dirname, 'src'),
            loader: 'babel-loader',
            query: {
                "presets": [["es2015", {modules: false}], "stage-0", "react"],
                "plugins": ['transform-async-to-generator', 'transform-decorators-legacy']
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'   // 自动补全css3前缀
            },
            {
                test: /\.(png|jpg|bmp)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }


        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || "production"),
                'PROD_SERVER': JSON.stringify(process.env.PROD_SERVER || DEFAULT_PROD_SERVER)
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
/*        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),*/
        new HtmlWebpackPlugin({
            template: 'client/index.hbs',
            hash: true,
            // User defined options
            version: packageJSON.version,
            revision: GIT_REVISION,
            buildTime: moment().format('YYYY-MM-DD HH:mm:ss')
        }),
        new webpack.ExtendedAPIPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    autoprefixer({browsers:['last 2 versions']}) // 自动补全css3前缀  浏览器版本
                ]
            }
        })
    ]
};
