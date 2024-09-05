## Usages

`pnpm run build` would both run Webpack and Rspack with config `./config.mjs`

- Webpack will emits output in `./webpack-dist`
- Rspack will emits output in `./rspack-dist`

`./webpack-dist` and `./rspack-dist` are purposely not added to `.gitignore`.
It is recommended to commit these files so we quickly compare the outputs.

## Issue


