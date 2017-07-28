import { optimize } from 'webpack'

import BabiliPlugin from 'babili-webpack-plugin'

import browserslist from 'browserslist'

const targetBrowsers = () => browserslist.readConfig('.browserlistrc').defaults

const babeldev = () => ({
  loader: 'babel-loader',
  options: {
    babelrc: false,
    plugins: [
      'transform-class-properties',
      [
        'transform-runtime',
        { polyfill: false, regenerator: true },
      ],
      [
        'transform-object-rest-spread',
        { useBuiltIns: true },
      ],
    ],
    presets: [
      [
        'env', {
          targets: {
            browsers: targetBrowsers(),
          },
          modules: false,
          useBuiltIns: true,
        },
      ],
      'react',
    ],
  },
})

export const loadJavascript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: [
          'react-hot-loader/webpack',
          // 'babel-loader',
          babeldev(),
        ],
      },
    ],
  },
})

export const lintJavascript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',

        use: ['eslint-loader'],
        options,
      },
    ],
  },
})

export const uglifyJavascript = () => ({
  plugins: [
    new optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
  ],
})

// TODO: For staging/integration, do NOT mangle class and function names!
// ie. keep below, but for production remove options entirely
export const minifyJavascript = () => ({ plugins: [
  new BabiliPlugin({ keepClassName: true, keepFnName: true }),
]})

export const generateSourceMaps = type => ({
  devtool: type,
})


export const extractJavascript = bundles => ({
  plugins: bundles.map(bundle => new optimize.CommonsChunkPlugin(bundle)),
})
