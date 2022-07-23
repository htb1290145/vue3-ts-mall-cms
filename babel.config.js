// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  // plugins: [
  //   [
  //     'import',
  //     {
  //       libraryName: 'element-plus',
  //       customStyleName: (name) => {
  //         return `element-plus/lib/theme-chalk/${name}.css`
  //       }
  //     }
  //   ]
  // ],
  presets: ['@vue/cli-plugin-babel/preset']
  // plugins: [
  //   AutoImport({
  //     resolvers: [ElementPlusResolver()]
  //   }),
  //   Components({
  //     resolvers: [ElementPlusResolver()]
  //   })
  // ]
}
