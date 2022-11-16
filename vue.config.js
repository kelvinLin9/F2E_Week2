const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 修正檔案命名問題
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/F2E_Week2/' : '/'
})

//
// module.exports = {
//   configureWebpack: {
//     externals: {
//       // CDN 的 Element 依赖全局变量 Vue， 所以 Vue 也需要使用 CDN 引入
//       vue: 'Vue',
//       // 属性名称 element-ui, 表示遇到 import xxx from 'element-ui' 这类引入 'element-ui'的，
//       // 不去 node_modules 中找，而是去找 全局变量 ELEMENT
//       fabric: 'fabric',
//       pdf: 'pdf',
//       'vue-router': 'VueRouter'
//     }
//   }
// }
