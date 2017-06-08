export const loadHtml = () => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader?name=[name].[ext]',
          },
        ],
      },
    ],
  },
})

export const loadAssets = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif|eot|svg|ttf|woff|woff2)$/,
        include,
        exclude,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 20000 },
          },
        ],
      },
    ],
  },
})
