module.exports = {
    devServer: {
        proxy: {
            '/api': {
              target: 'https://news-at.zhihu.com',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                '^/api': ''
              }
            }
          }
    },
    css: {
      loaderOptions: {
          css: {
              // options here will be passed to css-loader
          },
          postcss: {
              // options here will be passed to postcss-loader
              plugins: [require('postcss-px2rem')({
                  remUnit: 37.5
              })]
          }
      }
  }
  }