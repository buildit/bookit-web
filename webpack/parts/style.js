import ExtractTextPlugin from 'extract-text-webpack-plugin'

const autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: () => ([
      require('autoprefixer')(),
    ]),
  },
})

export const loadStyles = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        include,
        exclude,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              camelCase: 'only',
              localIdentName: '[name]-[local]--[hash:base64:5]',
              importLoaders: 2,
            },
          },
          autoprefix(),
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
})

export const lintStyles = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'postcss-loader',
        options: {
          plugins: () => ([
            require('stylelint')(),
            require("postcss-reporter")({ clearMessages: true }),
          ]),
        },
      },
    ],
  },
})

export const extractStyles = ({ include, exclude } = {}) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
    disable: false,
    allChunks: true,
  })

  return {
    module: {
      rules: [
        {
          test: /\.(sass|scss|css)$/,
          include,
          exclude,
          use: plugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { sourceMap: true, modules: true, camelCase: 'only', localIdentName: '[name]-[local]', importLoaders: 2 },
              },
              autoprefix(),
              { loader: 'sass-loader', options: { sourceMap: true } },
            ],
          }),
        },
      ],
    },
    plugins: [ plugin ],
  }
}

