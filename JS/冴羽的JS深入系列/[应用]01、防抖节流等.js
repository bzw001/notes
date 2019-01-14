/**
 * 防抖节流应用场景：
 *  事件频繁触发
 */

 /**
  * 一、防抖：事件多次触发，只有事件的触发间隔达到预设值，事件才会处理
  * 
  * 实现功能：
  * a、预设事件
  * b、立即执行? 
  * c、返回值
  * d、取消
  */
 function debounce (func, wait, immediate) {
   var timerId , result;
   var debounced =  function() {
     var context = this;
     var args = arguments;

     if(timerId) clearTimeout(timerId);
     if(immediate) {
       //如果执行过，则不执行
       var callNow = !timerId;
       timerId = setTimeout(function() {
        timerId = null;
       },wait);
       if(callNow) result = func.apply(context, args);
     } 
     else {
       timerId = setTimeout(function() {
         func.apply(context.args);
       },wait);
     }

     return result;
   };
   debounced.cancel = function() {
     clearTimeout(timerId);
     timerId = null;
   }

   return debounced;
 }

 /**
  * 节流throttle: 事件持续触发，每隔固定时间执行一次事件
  * 实现： 使用时间戳或者定时器
  * 功能： 
  *  a、时间间隔
  *  b、leading: 是否第一次执行, trailing: 停止触发时是否执行
  */
function throttle(func, wait, options) {
  var timerId, context, args, result;
  var previous = 0;
  options = options || {};
  var later = function() {
    previous = options.leading ? new Date().getTime() : 0;
    timerId = null;
    func.apply(context, args);
    if(!timerId) context = args = null;
  }

  var throttled = function() {
    var now = new Date().getTime();
    if(!previous && !options.leading) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if(remaining <=0 || remaining > wait) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      previous = now;
      func.apply(context, args);
      if(!timerId) context = args = null;
    } else if (!timerId && options.trailing) {
        timerId = setTimeout(later, remaining);
    }
  }
}