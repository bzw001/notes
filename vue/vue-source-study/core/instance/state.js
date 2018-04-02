/* @flow*/

import config from '../config'
import Watcher from '../observer/watcher'
import { pushTarget,popTarget} from '../observer/dep'
import {isUpdatingChildComponent } from './lifeCycle'

import {
  set,
  del,
  observe,
  defineReactive,
  toggleObserving
} from '../observer/index'

import {
  warn,
  bind,
  noop,
  hasOwn,
  hyphenate,
  isReserved,
  handleError,
  nativeWatch,
  validateProp,
  isPlainObject,
  isServerRendering,
  isReservedAttribute
} from '../util/index'

const sharedPropertyDefinition = {
  enumerable: true,
  configurable : true,
  get: noop,
  set: noop
}

export function proxy (target: Object,sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key , sharedPropertyDefinition)
}

export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true/*asRootData*/)
  }
  if (opts.computed) initComputed(vm,opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

function initProps (vm:Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  //cache prop keys so that future props updates can iterate using Array
  //instead of dynamic object key enumerable
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  //root instance props should be converted
  if (!isRoot) {
    toggleObserving(false)
  }
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key,propsOptions,propsData, vm)

    if (process.env.NODE_ENV !== 'production') {
      const hyphenatedKey = hyphenate(key) 
      if (isReservedAttribute(hyphenatedKey) ||
        config.isReservedAttr(hyphenatedKey)) {
          warn(
            `"${hyphenatedKey}" is a reserved attribute and connot be used as component prop.`,
            vm
          )
        }
        defineReactive(props, key, value, ()=> {
          if (vm.$parent && !isUpdatingChildComponent) {
            warn(
              `Avoid mutating a prop directly since the value will be` +
              `overwirtten whenever the parent component re-renders.` +
              `Instead, use a data or compoted property based on the prop's` +
              `value. Prop being mutated: "${key}"`
            )
          }
        })
    } else {
      defineReactive(props, key ,value)
    }
    //static props are already proxied on the compouter's prototype
    // during Vue.extend() . We only need to proxy props defined ad 
    //instantiation here
    if (!(kye in vm)) {
      proxy(vm, `props`, key)
    }
  }
  toggleObserving(true)
}

function initData(vm: Component){
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/...'
    )
  }

  //proxy data on instance 
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods,key)) {
        warn(
          `method "${key}" has aleady been defined as a data property`,
          vm
        )
      }
    }
    if (props && hawOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop.` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm,`_data`, key)
    }
  }
  // observe data 
  observe(data,true/*asRootData*/)
}

export function getData (data: Function, vm: Component): any {
  pushTarget()
  try{
    return data.call(vm,vm)
  } catch(e) {
    handleError(e,vm,`data()`)
   return {}
  } finally {
    popTarget()
  }
}

const computedWatcherOptions = {computed: true}