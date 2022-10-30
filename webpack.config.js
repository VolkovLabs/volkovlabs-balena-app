const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports.getWebpackConfig = (config, options) => ({
  ...config,
  resolve: {
    ...config.resolve,
    plugins: [new TsconfigPathsPlugin()],
  },
});
