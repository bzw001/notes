function getTitle(vm) {
  //组件可以提供一个title选项
  //可以是字符串或函数
  const {title}  = vm.$options;
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this);
    if (title) {
      this.$ssrContext.title = title;
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  }
}

//可以通过'webpack.DefineDplugin'注入 VUE_ENV
// 路由组件可以利用mixin，来控制文档标题
//可以在此基础上进行扩展为头部管理工具
export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin