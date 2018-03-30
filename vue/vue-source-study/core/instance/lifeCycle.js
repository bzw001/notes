/*@flow */

import config from '../config'
import Watcher from '../observer/watcher'
import {mark,measure} from '../utl/perf'
import {createEmptyVNode} from '../vdom/vnode'
import {updateComponentListeners} from './events'
import {resolveSlots} from './render-helpers/resolve-slots'
import {toggleObserving} from '../observer/index'
import {pushTarget, popTarget} from '../observer/dep'

import {
  warn,
  noop,
  remove,
  handleError,
  emptyObject,
  validateProp
} from '../util/index' 

export let activeInstance: any = null
export let isUpdatingChildComponent: boolean = false

//初始化生命周期
export function initLifecycle (vm: Component) {
  const options = vm.$options

  //locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent=parent.$parent
    } 
    parent.$children.push(vm)
  }

  vm.$parent = parent
  vm.$root = parent ?parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = null
  vm._isMounted = null 
  vm._isDestroyed = false
  vm._isBeingDestroyed = false 

}

//给Vue挂载更新，强制更新，销毁等方法
export function lifcycleMixin (Vue: Class<Component>) {
  //更新组件
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm:Component = this 
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const prevActiveInstance = activeInstance
    activeInstance = vm
    vm._vnode = vnode
    // vu原型的__patch__在entry注入
    //如果是后端渲染
    if (!prevVnode) {
      // 初始化render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false/*removeOnly*/ )
    }else {
      //更新
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    activeInstance = prevActiveInstance
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC(高阶组件) , update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
    // updated hook is called by the scheduler to ensure that children are updated in a parent's updated hook
  }
  Vue.prototype.$forceUpdate = function () {
    const vm:Component = this
    if (vm._watcher) {
      vm._watcher.update()
    }
  }
  //销毁组件
  Vue.prototype.$destroy = function () {
    const vm:Component = this
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm,'beforeDestroy')
    vm._isBeingDestroyed = true
    //remove self from parent
    const parent = vm.$parent
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }
    //teardown watchers
    if(vm._watcher){
      vm._watcher.teardown()
    }
    let i = vm._watcher.length
    while (i--) {
      vm._watcher[i].teardown()
    }
    //remove reference from data ob
    //frozen object may not have observer
    if(vm._data.__ob__) {
      vm._data.__ob__.vmCount--
    }
    // call the last hook
    vm._isDestroyed = true 
    // invoke destroy  hooks on current rendered tree
    vm.__patch__(vm._vnode,null)
    //fire destroyed hook
    callHook(vm,'destroyed')
    //turn of all instance listener
    vm.$off()
    //remove __vue__ reference 
    if(vm.$el) {
      vm.$el.__vue__ = null
    }
    //release circular reference
    if (vm.$vnode) {
      vm.$vnode.parent = null
    }
  }
}