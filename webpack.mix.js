let mix = require('laravel-mix');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.setPublicPath('./themes/' + process.env.MIX_THEME + '/assets');

mix.webpackConfig({
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': __dirname + '/themes/' + process.env.MIX_THEME + '/assets',
        '@src': __dirname + '/themes/' + process.env.MIX_THEME + '/assets/src'
      },
    },
    plugins: [
      new SVGSpritemapPlugin('./themes/' + process.env.MIX_THEME + '/assets/src/icons/*.svg')
    ]
  });

mix.js('./themes/' + process.env.MIX_THEME + '/assets/src/app.js', 'dist/js')
  .sass('./themes/' + process.env.MIX_THEME + '/assets/src/app.scss', 'dist/css')
  .options({
    postCss: [
      require('postcss-url'),
      require('autoprefixer')({
        overrideBrowserslist: ['last 6 versions'],
            grid: true
      }),
      require('cssnano')({
          preset: ['default', {
              discardComments: {
                  removeAll: true,
              },
          }]
      }),
    ]
  })
  .browserSync({
    proxy: 'child.local',
    host: 'child.local',
    notify: false,
    files: [
      "./themes/" + process.env.MIX_THEME + "/assets/dist/css/*.css",
      "./themes/" + process.env.MIX_THEME + "/assets/dist/js/*.js",
      "./themes/" + process.env.MIX_THEME + "/**/*.htm",
    ]
});
