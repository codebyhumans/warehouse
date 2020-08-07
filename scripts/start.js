const WebpackDevServer = require('webpack-dev-server')
const inquirer = require('inquirer')
const webpack = require('webpack')

const staticBuild = (webpackConfig, options) => {
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

const watchBuild = (webpackConfig, options) => {
  return new Promise((resolve, reject) => {
    const config = webpackConfig(options)
    const compiler = webpack(config)

    const server = new WebpackDevServer(compiler, config.devServer)

    server.listen(config.devServer.port, 'localhost', (err) => {
      if (err) {
        reject(err)
      }

      resolve()
    })
  })
}

;(async function () {
  const answers = await inquirer.prompt([
    {
      message: 'Select environment',
      name: 'mode',
      type: 'list',
      choices: () => ['development', 'production'],
    },
    {
      message: 'Start bootstrap window?',
      name: 'bootstrap',
      type: 'confirm',
      when(answers) {
        return answers.mode === 'development'
      },
    },
  ])

  process.env.NODE_ENV = answers.mode
  const isProduction = process.env.NODE_ENV === 'production'

  await Promise.all([
    staticBuild(require('../configs/webpack.electron'), {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.BOOTSTRAP': answers.bootstrap,
        }),
      ],
    }),
    [isProduction ? staticBuild : watchBuild][0](require('../configs/webpack.bootstrap')),
    [isProduction ? staticBuild : watchBuild][0](require('../configs/webpack.client')),
  ])

  require('child_process').exec('electron .')
})()
