/**@flow */

import config from '../config'
import {initProxy} from './proxy'
import {initState} from './state'
import {initRender} from './render'
import {initEvents} from './events'
import {mark,measure} from '../util/perf'
import {initLifeCycle,callHook} from './lifeCycle'
import {initProvide,initInjections} from './inject'
import {extend,mergeOptions,formatComponentName} from '../util/index'

let uid=0;

export function initMixin (Vue:Class<Component>){
  Vue.prototype._init = function (options?:Object){
    const vm: Component = this;

    vm._uid = uid++;

    let startTag,endTag
    if(process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag= `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // 避免观察到标志位
    vm._isVue=true
    //合并选项
    if(options && options._isComponent) {
      // 初始化内部组件构建
      //动态选项的合并速度较慢，内部组件的项目不需要特别对待
      initInternalComponent(vm,options)
    }else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    
    if(process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    }else {
      vm._renderProxy = vm
    }

    //暴露自己
    vm._self = vm
    initLifeCycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm,'beforeCreate')
    initInjections(vm)  //在 data/pros前注入
    initState(vm)
    initProvide(vm)    //在data/props 后解决服务
    callHook(vm,'created')

    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name= formatComponentName(vm,false)
      mark(endTag)
      measure(`vue ${vm._name} init`,startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option 改变了
      // 合并成新options
      Ctor.superOptions = superOptions;
      //检查 是否有行次修改的选项
      const modifiedOptions = resolveModifiedOptions(Ctor)
      //更新基础扩展选项
      if (modifiedOptions) {
        extend(Ctor.extendOptions,modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOtions,Ctor.extendOptions)
      if(options.name) {
        options.Components[options.name] = Ctor
      }
    }
  }
  return options 
}

function resolveModifiedOptions (Ctor: Class<Component>: ?Object) {
  let modified
  const latest = Ctor.options
  const extended = Ctor.extendOptions
  const sealed = Ctor.sealedOptions

  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = dedupe (latest[key], extended[key], sealed[key])
    }
  }
  return modified 
}
//删除重复数据
// 返回latest数据中属于extended，但不属于sealed的数据
function dedupe (latest, extended, sealed) {
  //比较latest /sealed 确保 生命周期 钩子没有被复制
  if (Array.isArray(latest)) {
    const res = []
    sealed = Array.isArray(sealed) ? sealed : [sealed]
    extended = Array.isArray(extended) ? extended : [extended]
    for (let i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options 
      if(extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i])
      }
    }
    return res;
  } else {
    return latest 
  }
}