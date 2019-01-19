/**
 * eq需要处理各种数据类型的对比
 * +0  -0
 * NaN NaN
 * 'str' new String('str')
 * new Date
 * RegExp
 * Number
 * 数组相等 (递归遍历一遍)
 * 对象间李属性引用自己 (使用stack存储判断)
 */

 var toString = Object.prototype.toString;
 function isFunction(obj) {
  return toString.call(obj) === '[object Function]';
 }

 function eq(a, b, aStack, bStack) {
   // 区分+0 ,-0
   if(a === b) return a !== 0 || 1 / a === 1/b;
   if(a == null || b == null) return false;

   //判断NaN
   if(a !== a) return b !==b;
   
   // 判断参数a类型，如果是基本类型，直接返回false
   var type = typeof a;
   if(type !== 'function' && type !== 'object' && typeof b != 'object') return false;
   // 更复杂的对象使用deepEq 函数进行深度比较
   return deepEq(a, b, aStack, bStack);
 }

 function deepEq(a, b, aStack, bStack) {
   // a 和 b的内部属性 [[class]] 相同时返回true
   var className = toString.call(a);
   if(className !== toString.call(b)) return false;

   switch(className) {
     case '[object RegExp]':
     case '[object String]':
        return '' + a === '' + b;
     case '[object Number]':
        if(+a !== +a) return +b !== +b;
        return +a === 0 ? 1/+a === 1/b: +a === +b;
     case '[object Date]':
     case '[object Boolean]':
        return +a === +b;
   }

   var areArrays = className === '[obejct Array]';
   if(!areArrays) {
     // 过来两个函数的情况
     if(typeof a != 'object' || typeof b != 'object') return false;

     var aCtor = a.constructor,
         bCtor = b.constructor;
     if(aCtor !== bCtor && !(isFunction(aCtor) && aCtor && isFunction(bCtor)
      && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)
     ){
       return false;
     }

     aStack = aStack || [];
     bStack = bStack || [];
     var length = aStack.length;

     //检查是否有循环引用的部分
     while(length -- ){
       if(aStack[length] === a) {
         return bStack[length]  === b;
       }
     }

     aStack.push(a);
     bStack.push(b);

     if(areArrays) {
       length = a.length;
       if(length !== b.length) return false;

       while(length --) {
         if(!eq(a[length], b[length], aStack, bStack)) return false;
       }
     } else {
       var keys = Object.keys(A),key;
       var length = keys.length;

       if(Object.keys(b).length !== length) return false;
       while(length--) {
         key = keys[length];
         if(!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false;
       }
     }
   }
   aStack.pop();
   bStack.pop();
   return true;
 }