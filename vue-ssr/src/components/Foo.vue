<template>
 <div>
    <div>{{fooCount}}</div>
    <div>异步注册store模块</div>
 </div>
</template>

<script>

import fooStoreModule from '../store/module/foo';
export default {
  //从这里导入模块配置，而不是直接在store中
  asyncData ( {store}) {
    store.registerModule('foo',fooStoreModule);
    return store.dispatch('foo/inc')
  },
  //离开时销毁,避免多次访问导致重复注册
  destroyed () {
    this.$store.unregisterModule('foo');
  },
  computed: {
    fooCount () {
      return this.$store.state.foo.count;
    }
  }
}
</script>

