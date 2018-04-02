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

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component{
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVnode 
    if (process.env.NODE_ENV !== 'production') {
      /* istambul ignore if*/
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
          warn(
            'You are using the runtime-only build of Vue where the template' +
            'compiler is not available. Either pre-compile the template into' +
            'render functions , or use the compiler-included build' ,
            vm
          )
        } else {
          warn(
            'Fail to mount component: template or render function not defined.',
            vm
          )
        } 
    }
  }
  callHook(vm,'beforeMount')

  let updateComponent
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () =>{
      const name = vm._name
      const id = vm._uid 
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} patch`,startTag,endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(),hydrating)
    }
  }

  // set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  //component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted) {
        callHook(vm,'beforeMounted')
      }
    }
  }, true /* isRenderWatcher*/)
  hydrating = true

  //manually mounted instance , call mounted on self 
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}

export function updateChildComponent(
  vm: Component,
  propsData: ?Object,
  listener: ?Object,
  parentVnode: MountedComponentVNode,
  renderChildren ?Array<VNode>
){
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true
  }

  //determine whether component has slot children
  //we need to do this before overwriting $options._renderChildred
  const hasChildren = !!(
    renderChildren ||               //has new static slots 
    vm.$options._renderChildren ||  // has old static slots 
    parentVnode.data.scopedSlots || // has new scoped slots 
    vm.$scopedSlots !== emptyObject // has old scoped slots
  )

  vm.$options._parentVnode = parentVnode
  vm.$vnode = parentVnode  //update vm's placeholder node without re-render

  if (vm._vnode) {  // update child tree's parent
    vm._vnode.parent = parentVnode
  }
  vm.$options._renderChildren = renderChildren

  //update $attrs and $listeners hash 
  //these are also reactive so they may trigger child  update if the child 
  //used them  during render
  vm.$atts = parentVnode.data.atts || emptyObject
  vm.$listeners = listeners || emptyObject

  //update props 
  if (propsData && vm.$options.props) {
    toggleObserving(false)
    const props = vm._props
    const propKeys = vm.$options._propKeys || []
    for (let i=0; i < propKeys.length; i++){
      const key = propKeys[i]
      const propOptions: any = vm.$options.props //
      props[key] = validateProp(key, propOptions, propsData, vm)
    }
    toggleObserving(true)
    //keep a copy of raw propsData
    vm.$options.propsData = propsData
  }

  //update listeners 
  listeners = listeners || emptyObject
  const oldListeners= vm.$options._parentListeners
  vm.$options._parentListeners =  listeners
  updateComponentListeners(vm,listeners ,oldListeners)

  //resolve slots + force update  if has children 
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context)
    vm.forceUpdate()
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) return true
  }
  return false
}

export function activateChildComponent (vm: Component, direct?: boolean) {
  if (direct) {
    vm._directInactive = false
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false
    for (let i =0 ;i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i])
    }
    callHook(vm,'activated')
  }
}

export function deactivateChildComponent (vm: Component, direct?: boolean) {
  if (direct) {
    vm._directInactive = true
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true
    for (let i=0; i< vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i])
    }
    callHook(vm,'deactivated')
  }
}

export function callHook (vm: Component, hook: string) {
  //disable dep collection when invoking lifcycle hooks
  pushTarget();
  const handlers = vm.$options[hook]
  if(handlers) {
    for (let i =0 ,j=handlers.length; i < j ; i++) {
      try {
        handlers[i].call(vm)
      }catch (e) {
        handleError(e, vm, `${hook} hook`)
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
  popTarget();
}