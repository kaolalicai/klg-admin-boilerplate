/**
 * 加载 modules/xxxx/store 目录下所有 vuex module 文件，生成 vuex 所需数据
 */

// Use require.context to require reducers automatically
// Ref: https://webpack.js.org/guides/dependency-management/#require-context
const context = require.context('./', false, /\.js$/)
const modules = context
  .keys()
  .filter(item => item !== './index.js')
  .map(key => ({
    key,
    module: context(key)
  }))

/**
 * 获取 vuex 所需 module name
 * @param {string} key e.g. ./orders.js
 * @return {object} {moduleName: 'orders'}
 */
function getModuleName (key) {
  // ./orders.js => orders
  const moduleName = key.replace('.js', '').replace('./', '')
  return moduleName
}

// Ref: https://vuex.vuejs.org/en/modules.html
let vuexModuleData = {
  modules: {
    // fill later
  }
}

modules.forEach(item => {
  const moduleName = getModuleName(item.key)
  if (!vuexModuleData.modules[moduleName]) {
    vuexModuleData.modules[moduleName] = item.module.default
  }
})

export default vuexModuleData
