/**
 * typeof :
 *  typeof null // 'object'
 */

 /// 使用Object.prototype.toString
 Object.prototype.toString.call(undefined);// [object Undefined]

 // 但是对于IE6来讲 , null 与undefined 会被Object.prototype.toString识别成[object Object]

 // 识别plainObject (通过{}或new Object创建的)
 /// Object.getPrototypeOf(obj) 返回原型. 没有原型或者原型为Object构造函数

 /// 判断是否是DOM元素,
 function isElement(obj) {
   return !!(obj && obj.nodeType === 1);
 }