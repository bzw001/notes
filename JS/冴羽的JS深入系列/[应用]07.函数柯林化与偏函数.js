/**
 * 柯林化函数的几个作用：
 * 1、延迟计算
 * 2、参数复用
 * 3、动态生成函数
 */
function curry(fn, args, holes) {
  var length = fn.length;
  args = args || [];
  holes = holes || [];

  return function() {
    var _args = args.slice(0),
        _holes = holes.slice(0),
        argsLen = args.length,
        holesLen = holes.length,
        arg, i , index = 0;
    for(i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      // 处理类似fn(1,_,_,4)(_,3)这种情况，index需要指向holes正确的下标
      if(arg === _ && holesLen) {
        index++;
        if(index > holesLen) {
          index++;
          if(index > holesLen) {
            _args.push(arg);
            _holes.push(argsLen - 1 + index - holesLen);
          }
        }
      }
      // 处理类似fn(1)(_)这种情况
      else if(arg === _){
        _args.push(arg);
        _holes.push(argsLen + i);
      }
      // 处理类似fn(_,2)(1)这种情况
      else if(holesLen) {
        // fn(_,2)(_,3)
        if(index >= holesLen) {
          _args.push(arg);
        }
        // fn(_,2)(1)用参数1替代占位符
        else {
          _args.splice(_holes[index], 1 , arg);
          _holes.splice(index, 1);
        }
      }
      else {
        _args.push(arg);
      }
    }
    if(_holes.length || _args.length < length) {
      return curry.call(this, fn, _args, _holes);
    }
    else {
      return fn.apply(this, _args);
    }
  }
}

var _ = {};
var fn = curry(function(a,b,c,d,e) {
  console.log([a,b,c,d,e]);
})

fn(1,2,3,4,5); // [1,2,3,4,5]
fn(_,2,3,4,5)(1);// [1,2,3,4,5]
fn(1)(2)(3)(4)(5);// [1,2,3,4,5]

/**
 * 偏函数
 * 固定一个函数的一些参数，然后产生另一个更小元的函数
 */
function add (a,b) {
  return a + b;
}
add(1,2);//3
// partial函数做到局部应用
var addOne = partial(add,1);
addOne(2) //3

/**
 * 柯林化时将一个多阐述函数转换成多个单参数函数，就是将一个n元函数转换成n个一元函数
 * 局部应用则是固定一个函数的一个或者多个参数，也就是将一个n元函数转换成一个n-x元函数
 * 
 * Curried function are automatically partially applied
 */

 /// 可以使用占位符
 var _ = {};

 function partial(fn) {
   var args = [].slice.call(arguments, 1);
   return function() {
     var position = 0, len = args.length;
     for(var i = 0; i < len; i++) {
       args[i] = args[i] === _ ? arguments[position ++] : args[i];
     }

     while(position < arguments.length) args.push(arguments[position++]);
     return fn.apply(this, args);
   }
 }