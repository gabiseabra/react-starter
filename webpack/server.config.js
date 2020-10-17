const filterEnv = require('./blocks/filterEnv')
const merge = require('./blocks/merge')
const typescript = require('./blocks/typescript')
const {createConfig, optimization} = require('webpack-blocks')

/**
 * Razzle plugin to modify the server bundle's webpack config
 */
module.exports = (config, env) =>
  createConfig([
    merge({...config, externals: env.dev ? config.externals : undefined}),
    typescript(),
    optimization({minimize: false}),
    filterEnv((_value, key) => /^process\.env\.RAZZLE_/.test(key))
  ])
