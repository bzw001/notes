/* @flow */

import Dep from './dep'
import VNode from '../vdom/vnode'
import {arrayMethods} from './array'
import {
  def,
  warn,
  hasOwn,
  hasProto,
  isObject,
  isPlainObject,
  isUndef,
  isValidArrayIndex,
  isPremitive,
  isServerRendering
} from '../util/index'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
 * In some cases we may want to diable observation inside a component's 
 * update computation
 */
export let shouldObserve: boolean = true

export function toggleObserving (value: boolean) {
  shouldObserve = value
}

/**
 * Observe class that is attached to each observed
 * object. once attached ,the observer converts the target 
 * object's property keys into getter/setter that 
 * collect dependencies and dispatch updates
 */

 export class Observer {
   value: any;
   dep: Dep;
   vmCount: number;

   constructor(value: any) {
     this.value = value
     this.dep = new Dep()
     this.vmCount = 0 
     def(value, '__ob__', this)
     if (Array.isArray(value)) {
       const augment = hasProto
       ? protoAugment
       : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value)
     } else {
       this.walk(value)
     }
   }

   /**
    * Walk through each property and convert then into 
    * getter/setters. this method should only be called when
    * value type is object
    */
   walk(obj: Object) {
     const keys = Object.keys(obj)
     for (let i =0 ;i< keys.length; i++) {
       defineReactive(obj, keys[i])
     }
   }

   /**
    * Observe a list of Array items
    */
   observeArray (items: Array<any>) {
     for( let i = 0, l = items.length; i < l; i++) {
       observe(items[i])
     }
   }
 }

 // helpers

 /**增加原型
  * Augent an target Object or Array by intercepting
  * the prototype chain using __proto__
  */
 function protoAugment( target, src: Object, keys: any) {
   /*eslint-disable no-proto */
   target.__proto__ = src
   /*eslint-disable no-proto        */
 }

 /**
  * Augement an target Object or Array by defining
  * hidden properties
  */
 function copyAugment (target: Object, src: Object, keys: Array<string>) {
   for (let i = 0, l = keys.length; i < l; i++) {
     const key = keys[i]
     def(target,key, src[key])
   }
 }

 /**
  * Attempt to create an observer instance for a value
  * returns the new observer if successfully observed,
  * or the existing observer if the value already has one.
  */

  export function observe(value :any, asRootData: ?boolean): Observer | void {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    let ob: Observer | void
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__
    } else if (
      shouldObserve &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) && //该值是否可添加新属性
      !value._isVue
    ){
      ob = new Observer(value)
    }
    if (asRootData && ob ) {
      ob.vmCount++
    }
    return ob
  }

  /**
   * define a reactive property on an Object
   */
  export function defineReactive(
    obj: Object,
    key: string,
    val: any,
    customSetter?: ?Function,
    shallow?: boolean
  ){
    const dep = new Dep()
    //获得对象属性描述
    const property = Object.getOwnPropertyDescriptor(obj,key)
    if (property && property.configurable == false) {
      return
    }

    //cater for pre-defined getter/setter
    const getter = property && property.get
    const setter = property && property.set
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key]
    }

    let childOb = !shallow && observe(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter (){
        const value = getter ? getter.call(obj) : val
        if (Dep.target) {
          dep.depend()
          if (childOb) {
            childOb.dep.depend()
            if (Array.isArray(value)) {
              dependArray(value)
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal){
        const value = getter ? getter.call(obj) : val
        /* eslint-diable no-self-compate */
        if (newVal === value || (newVal !==  newVal && value !== value/*如果value与newVal是NaN的情况*/)){
          return
        }
        /* eslint-diable no-self-compate */
        if (process.env.NODE_ENV !== 'production' && customSetter) {
          customSetter()
        }
        if (setter) {
          //如果该值已设置setter
          setter.call(obj, newVal)
        } else {
          val = newVal
        }
        childOb = !shallow && observe(newVal)
        dep.notify() 
      }
    })
  }

  /**
   * Set a property on an object, Adds the new property and 
   * triggers change notification if the property doesn't 
   * already exist
   */
  export function set (target: Array<any> | Object, key:any, val: any): any{
    if (process.env.NODE_ENV !== 'production' &&
      (isUndef(target) || isPremitive(target))  
    ) {
      warn(`cannot set reactive property on undefined ,null, or primitive value:`)
    } 
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.length = Math.max(target.length,key)
      target.splice(key, 1, val)
      return val
    }
    if (key in target && !(key in Object.prototype)) {
      target[key] = val
      return val
    }
    const ob = (target: any).__ob__ ;
    if (target._isVue || (ob && ob.vmCount)) {
      process.env.NODE_ENV !== 'production' && warn(
        'Avoid adding reactive properties to a Vue instance or its root $data'+
        'at runtime - declare it upfront in the data option'
      )
      return val
    }
    if (!ob) {
      target[key] = val
      return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
  }

  /**
   * Delate a property and trigger change if necessary
   */
  export function del (target: Array<any> | Object, key: any) {
    if (process.env.NODE_ENV !== 'production' &&
      (isUndef(target) || isPremitive(target)) 
    ) {
      warn(`Cannot delete reactive property on undefined,null, or primitive value`)
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.splice(key,1)
      return
    }
    const ob = (target: any).__ob__
    if(target._isVue || (ob && ob.vmCount)){
      process.env.NODE_ENV !== 'production' && warn(
        'Aviod deleting properties on a Vue instance or its root $data' +
        '- just set it to null'
      )
      return
    }
    if (!hasOwn(target,key)) {
      return
    }
    delete target[key]
    if (!ob) {
      return
    }
    ob.dep.notify()
  }


  /**
   * collect  dependencies on array elements when the array is touched , since 
   * we cannot intercept array element access like property getters
   */

   function dependArray (value: Array<any>) {
      for(let e, i=0, l = value.length; i <l; i++) {
        e = value[i]
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
          dependArray(e)
        }
      }
   }
 