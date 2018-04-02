import {initMixin} from './init'
import {stateMixin} from './state'
import {renderMixin} from './render'
import {eventsMixin} from './events'
import {lifecycleMixin} from './lifecycle'
import {warn} from '../util/index'

function Vue (options) {
  if(process.env.NODE_ENVE !== 'production' &&
    !(this instanceof Vue)
  ){
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// 给Vue挂载各种方法属性
initMixin(Vue)
stateMixin(Vue)   //初始化 props,data,computed,methods,watched成员
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue