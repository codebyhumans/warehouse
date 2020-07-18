const WebpackDevServer = require('webpack-dev-server');
const inquirer = require('inquirer');
const webpack = require('webpack');

const webpackBootstrapConfig = require('../configs/webpack.bootstrap');
const webpackElectronConfig = require('../configs/webpack.electron');
const webpackClientConfig = require('../configs/webpack.client');

const staticCompile = (webpackConfig, options) => {
  return new Promise((resolve, reject) => {
    const config = webpackConfig(options);
    const compiler = webpack(config);

    compiler.run((err, stats) => {
      if (err) return reject(err);

      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        }) + '\n',
      );

      resolve();
    });
  });
};

const watchCompile = (webpackConfig, options) => {
  return new Promise((resolve, reject) => {
    const config = webpackConfig(options);
    const compiler = webpack(config);

    const server = new WebpackDevServer(compiler, config.devServer);

    server.listen(config.devServer.port, 'localhost', (err) => {
      if (err) {
        reject(err);
      }
    });
  });
};

(async function () {
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
        return answers.mode === 'development';
      },
    },
  ]);

  process.env.NODE_ENV = answers.mode;
  const options = { mode: answers.mode };
  const isProduction = process.env.NODE_ENV === 'production';

  const compilers = [
    staticCompile(webpackElectronConfig, {
      ...options,
      plugins: [
        new webpack.DefinePlugin({
          'process.env.BOOTSTRAP': answers.bootstrap,
        }),
      ],
    }),
  ];

  if (isProduction) {
    compilers.push(staticCompile(webpackBootstrapConfig, options), staticCompile(webpackClientConfig, options));
  } else {
    compilers.push(watchCompile(webpackBootstrapConfig, options), watchCompile(webpackClientConfig, options));
  }

  await Promise.all(compilers);
})();
