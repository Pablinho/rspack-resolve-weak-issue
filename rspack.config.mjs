import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const loadableComponents = path.resolve('node_modules', '@swc/plugin-loadable-components', 'swc_plugin_loadable_components.wasm');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "production",
  devtool: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: isRunningWebpack? "swc-loader" : "builtin:swc-loader",
          options: {
            minify: false,
            jsc: {
              experimental: {
                plugins: [
                  [loadableComponents, {}],
                ],
              },
            },
            env: {
              targets: [
                'Chrome >= 105',
                'Firefox >= 105',
                'Edge >= 105',
                'Android >= 105',
                'Samsung >= 21',
                'iOS_Saf >= 15',
                'Safari >= 15',
              ],
              bugfixes: true,
              exclude: ['proposal-object-rest-spread'],
            },
          },
        }
      }
    ]
  },
  entry: {
    main: "./src/index",
  },
  plugins: [new HtmlWebpackPlugin()],
  optimization: {
    minimize: false,
  },
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: true,
  },
  target: 'web'
};

export default config;
