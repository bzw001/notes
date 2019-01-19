/**
 * jQuery.extend(target, [object1],[object2]...);
 * 合并多个对象的内容到第一个对象
 */

 /// 第一版 extend ,浅拷贝
 function extend() {
  var name, options, copy;
  var length = arguments.length;
  var i =1;
  var target = arguments[0];

  for(; i < length; i++) {
    options = arguments[i];
    if(options != null) {
      for(name in options) {
        copy = options[name];
        if(copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
 }

 // 深拷贝 jQuery.extend([deep], target, object,...)
/**
 * 1、根据第一个参数的类型，确定target 和要合并的对象的下标起始值
 * 2、如果时深拷贝,根据copy的类型递归extend
 */

 function extend() {
   // 默认不进行深拷贝
   var deep = false;
   var name, options, src, copy;
   var length = arguments.length;
   // 记录要赋值的对象的下标
   var i = 1;
   var target = arguments[0] || {};
   if(typeof target == 'boolean') {
     deep = target;
     target = arguments[i] || {};
     i++;
   }
   if(typeof target !== 'object') {
     target = {};
   }
   for(; i < length; i++) {
     // 获取当前对象\
     options = arugments[i];
     if(options !=null) {
       for(name in options) {
         src = target[name];
         copy = options[name];
         // 避免重复引用, copy中引用了src中的对象
         if(target === copy) {
           continue;
         }
         if(deep && copy && typeof copy == 'object') {
           // 递归调用
           target[name] = extend(deep, src, copy);
         }
         else if (copy !== undefined) {
           target[name] = copy;
         }
       }
     }
   }
   return target;
 }


 /**
  * 数组的最大值与最小值
  * 1、最基本的使用for 循环
  * 2、先排序，取第一个/最后一个值
  * 3、使用Math.max/min, 由于不能直接接受数组，可使用apply, reduce, ...rest方法
  */
 Math.max.apply(null, [1,2,3])
 function max(prev, next) {
   return Math.max(prev, next);
 }
[1,2,3].reduce(max);
var arr = [1,2,3]
Math.max(...arr)