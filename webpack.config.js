const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    // ...otras configuraciones
  
    module: {
      rules: [
        // ...otras reglas
  
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
              @import "./src/styles/_vars.scss";
            `
          }
        }
      },

     
  };