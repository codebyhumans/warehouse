const webpack = require('webpack')

const build = (webpackConfig, options) => {
  return new Promise((resolve, reject) => {
    const config = webpackConfig(options)
    const compiler = webpack(config)

    compiler.run((err, stats) => {
      if (err) return reject(err)

      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        }) + '\n',
      )

      resolve()
    })
  })
}

;(async function () {
  process.env.NODE_ENV = 'production'

  await Promise.all([
    build(require('../configs/webpack.electron')),
    build(require('../configs/webpack.bootstrap')),
    build(require('../configs/webpack.client')),
  ])
})()
