const mix = require('laravel-mix');
const { readdirSync, statSync } = require('fs');
const path = require('path');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

class PugToHtml {
  dependencies() {
    return [
      'html-loader',
      'pug-html-loader',
      'html-webpack-plugin',
      'html-webpack-harddisk-plugin'
    ];
  }

  register(from, to, options) {
    if (!from) {
      throw new Error(
        'mix.pug is missing a source directory as first argument'
      );
    }
    this.from = from;

    if (!to) {
      throw new Error(
        'mix.pug is missing a destination directory as second argument'
      );
    }
    this.to = to;
  }

  webpackRules() {
    return {
      test: /\.pug$/,
      use: [
        {
          loader: 'html-loader',
          options: {
            attrs: false
          }
        },
        {
          loader: 'pug-html-loader',
          options: {
            pretty: true
          }
        }
      ]
    };
  }

  webpackPlugins() {
    const getDirectories = source =>
      readdirSync(source).filter(f => statSync(join(source, f)).isDirectory());

    const siteDirectories = getDirectories(path.resolve(this.from));

    const defaultOptions = {
      inject: true,
      minify: false,
      alwaysWriteToDisk: true,
      ...this.options
    };

    const htmlWebpackPlugins = siteDirectories.map(dirname => {
      return new HtmlWebpackPlugin({
        filename: `${dirname}/index.html`,
        template: `${this.from}/${dirname}/index.pug`,
        ...defaultOptions
      });
    });

    return [
      new HtmlWebpackPlugin({
        filename: `index.html`,
        template: `${this.from}/index.pug`,
        ...this.options
      }),
      ...htmlWebpackPlugins,
      new HtmlWebpackHarddiskPlugin()
    ];
  }
}

mix.extend('pug', new PugToHtml());
mix.extend('pugToHtml', new PugToHtml());
