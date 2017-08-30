import { resolve, join } from 'path'

import merge from 'webpack-merge'

import parts from './webpack/parts'

if (process.env.WDS_HOST === undefined) process.env.WDS_HOST = 'localhost'
if (process.env.WDS_PORT === undefined) process.env.WDS_PORT = 3001

const isVendor = ({ resource }) => resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/)

const PATHS = {
  root: resolve(__dirname),
  sources: join(__dirname, 'src'),
  build: join(__dirname, 'build'),
  exclude: [
    join(__dirname, 'build'),
    /node_modules/,
  ],
}

const commonConfig = merge([
  {
    context: PATHS.sources,
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: '/',
    },
  },

  parts.lintStyles({ include: PATHS.sources }),
  parts.lintJavascript({ include: PATHS.sources }),

  parts.loadHtml(),
  parts.loadAssets(),

  parts.loadJavascript({ include: PATHS.sources, exclude: PATHS.exclude }),

  parts.namedModulesPlugin(),
  parts.noErrorsPlugin(),
])

const developmentConfig = merge([
  {
    output: { pathinfo: true },
  },

  parts.loadStyles({ include: PATHS.sources, exclude: PATHS.exclude }),

  parts.devServer({ host: 'localhost', port: 3001 }),
  parts.generateSourceMaps('cheap-module-eval-source-map'),
])

const productionConfig = merge([
  {
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 100000,
      maxAssetSize: 450000,
    },
  },

  parts.cleanPlugin({ path: PATHS.build, root: PATHS.root }),

  parts.definePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),

  // TODO: figure out why this is breaking safari in production
  // Errors being generated in safari devtools:
  // manifest.js: [Error] TypeError: undefined is not an object (evaluating 'a[b].call')
	// __webpack_require__ (manifest.5fdd3492.js:1:119)
	// ./client/index.js (app.9cb2ee90.js:1:23085)
	// __webpack_require__ (manifest.5fdd3492.js:1:124)
	// (anonymous function) (app.9cb2ee90.js:1:108304)
	// __webpack_require__ (manifest.5fdd3492.js:1:124)
	// webpackJsonpCallback (manifest.5fdd3492.js:1:495)
	// Global Code (app.9cb2ee90.js:1)
  //
  // [Error] SyntaxError: Cannot declare a let variable twice: 'o'.
	// (anonymous function) (vendor.48ba2004.js:6)
  //
  // parts.minifyJavascript(),

  parts.extractStyles(),
  parts.extractJavascript([
    { name: 'vendor', chunks: [ 'app' ], minChunks: isVendor },
    { name: 'manifest', minChunks: Infinity },
  ]),
  parts.hashedModuleIdsPlugin(),
  parts.generateSourceMaps('source-map'),
])

export default (env) => {
  process.env.NODE_ENV = env
  process.env.BABEL_ENV = env

  const isDevelopment = env === 'development'

  const config = merge([
    parts.page({
      title: 'React Skellington Test',
      template: 'index.ejs',
      entry: {
        app: (
          isDevelopment ?
            parts.hotloader() : []
          ).concat([ './client/index.js' ]),
      },
    }),
    commonConfig,
    isDevelopment ?
      developmentConfig : productionConfig,
  ])

  // console.dir(config, { depth: null, colors: true })

  return config
}
