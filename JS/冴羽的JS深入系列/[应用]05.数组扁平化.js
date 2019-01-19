/**
 * 数组扁平化， 将嵌套多层的数组array转换成只有一层的数组
 */

 /// 首先想到递归
 var arr = [1, [2, [3,4],5,1],[2,[1,[3,[10,[100]]]]],3123,[1,2,[3],[123,[13,[20]]]]];
 function flatten(arr) {
   var result = [];
   for(var i = 0, len = arr.length; i< len; i++) {
     if(Array.isArray(arr[i])) {
       result = result.concat(flatten(arr[i]));
      //  result = [...result, ...flatten(arr[i])];
     }
     else {
       result.push(arr[i]);
     }
   }
   return result;
 }
console.time('flatten');
 console.log(flatten(arr));
 console.timeEnd('flatten');

 // 使用reduce

 function flatten2(arr) {
   return arr.reduce(function(prev,next) {
     return prev.concat(Arrary.isArray(next) ? flatten2(next) : next);
   },[])
 }
 console.time('flatten2');
 console.log(flatten(arr));
 console.timeEnd('flatten2');

 // 取并集
 function unique(array) {
   return Array.from(new Set(array));
 }

 function union() {
    return unique(flatten(arguments,true,true));
 }
