##### 1、let
+ 1、作用：产生块级作用域
+ 2、注意点：
  + 1.let声明必须在使用之后
  + 2、在for循环中循环控制于语句是一个中let声明变脸是一个父级作用域吗，大括号里中是一个单独的子作用域，
  这样的实现，在ES5是需要闭包的
```JAVASCRIPT
  var arr=[];
  for(let i=0;i<4;i++){
      arr[i]=function(){
          console.log(i)
      }
  }
  
  arr[2]();//打印2 如果使用var ，那么会是4
``` 
+ 3、原先使用var声明方式的麻烦，局部同名变量会覆盖全局变量，同时用于循环计数的变量会泄露成全局变量
+ 4、虽然ES6中规定了在大括号中声明的函数，拥有块级作用域，但是在具体的浏览器环境中，为了兼容以前的
  代码，在大括号中声明的函数，相当于还是ES5中的函数声明。当然可以使用let结合函数表达式来实现

##### 2、const
+ 1、const一样是声明与使用一样是块级的
+ 2、注意点：如果使用const针对一个复杂的对象，那么那个复杂对象不一定是不变的，因为这里的const变量保存的是
  一个指针。不可变的是这个指针
```javascript
    const obj={};
    obj.a=1; //可以
    obj.b=2; //可以
    obj={}; //报错,会更改地址
    
    //如果需要const声明一个真正的常量复杂对象，就需要使用Object.freeze函数
    const obj={};
    obj.a=1;//报错
    
    实现将一个对象及其属性完全冻结的函数:
      var constanize=(obj)=>{
          Object.freeze(obj);
          Object.keys(obj).forEach((key,i)=>{
              if(typeof obj[key]=='obejct'){
                  constanize(obj[key]);
              }
          })
      }
```

##### 3、global对象
+ 1、在ES5中定义地方的全局变量是挂载到顶级对象window的，这个被认为不利于模块化编程，在ES6中，使用let与const之类声明不与顶级对象挂钩
```javascript
    var a=1;
    window.a ; //1
    
    let b=1;
    window.b ;//undefiend
```

+ 2、在node中，顶级对象是global，现在没有在多种环境中使用同一方法得到顶级对象，以下是借助库或可以勉强可以得到顶级对象的函数
```javascript
   // 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};

或者使用垫片库system.global，能够在所有环境中得到global
```