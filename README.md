> [!IMPORTANT]
> Fixed on @rspack/core: 1.0.4

## Usages

`pnpm run build` would both run Webpack and Rspack with config `./config.mjs`

- Webpack will emits output in `./webpack-dist`
- Rspack will emits output in `./rspack-dist`

`./webpack-dist` and `./rspack-dist` are purposely not added to `.gitignore`.
It is recommended to commit these files so we quickly compare the outputs.

## Context
Some libraries like `@lodable/components` or `react-loadable` leverage this `require.resolveWeak` capability to implement their code-splitting abstractions. When generating ESM code that use them, we end up with `require.resolveWeak` inside ESM. This creates the runtime failure. 

## Issue

In a `production` Rspack build, a runtime failure was encountered in the browser due to a `require.resolveWeak` call in a ESM file. In the example, we've set `target: 'web'` and specified the target browsers in `swc-loader`:

`rspack-dist/479.js`
```js
    resolve (props) {
        if (true) {
            return require.resolveWeak(`./locale/${props.locale}/lite.js`);
        }
        return eval('require.resolve')(`./locale/${props.locale}/lite.js`);
    }
``` 

We are not encountering this issue in the Webpack build:

`wepack-dist/560.js`
```js
resolve (props) {
        if (true) {
            return /*require.resolve*/(__webpack_require__(268).resolve(`./${props.locale}/lite.js`));
        }
        return eval('require.resolve')(`./locale/${props.locale}/lite.js`);
    }
```

I've tried using Babel and encountered the same issue. Any thoughts or workarounds would be appreciated.
Seems similar to this issue in webpack: https://github.com/webpack/webpack/issues/18633.  Thanks in advance.








