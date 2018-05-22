<template>
  <div>{{item.title}}</div>  
</template>

<script>
export default {
  mixins:[titleMixin],
  name:'item',
  title() {
    return this.item.title;
  },
  props:['item'],
  //组件级别缓存
  serverCacheKey:props => props.item.id,
  asyncData ({store, route}) {
    //触发actions后，返回promise
    return store.dispatch('fetchItem', route.params.id)
  },
  computed: {
    //从 store 的state对象中获取的item
    item() {
      return this.$store.state.items[this.$route.params.id];
    }
  }
}
</script>

