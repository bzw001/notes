/**
 * 一、JS的静态作用域:
 * JS函数执行运用到了作用域链，这个作用域链时在函数定义的时候创建的
 */
var value = 1;
function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}
bar();// 打印1

/**
 * 二、执行上下文:
 *  1、JS的可执行代码：全局代码, 函数代码, eval代码
 *  2、执行一个函数时，会有执行上下文, JS引擎创建了执行上下文栈来管理
 *  执行上下文的三个重要属性： 变量对象，作用域链，this
 */
// 首先遇到全局代码
ECStack = [globalContext];

function func3() {
  console.log('func3');
}

function func2() {
  func3();
}

function fun1() {
  func2();
}

fun1();

// 当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈,函数执行完，就会将函数的执行上下文从栈中弹出

func1()
// ECStack.push(<func1> functionContext)
// func1 中调用了func2, 会创建func2的执行上下文
// ECStack.push(<fun2> functionContext)
// func2中调用了fun3
// ECStack.push(<fun3 functionContext>)

// fun3执行完毕
// ECStack.pop();
// fun2执行完毕
// ECStack.pop();
// func1执行完毕
// ECStack.pop();

// 继续执行下面代码，ECStack 底层总有一个globalContext

/**
 * 三、变量对象
 * 变量对象时于执行上下文相关的数据作用域，存储了在上下文中定义的变量与函数声明
 * 不同执行上下文的变量对象稍有不同，如全局上下文与函数上下文
 * 
 * 全局上下文的变量对象就是全局对象
 * 函数上下文，通过活动对象来表示变量对象，变量对象时规范上或引擎上实现的，不可再javascript环境中访问
 * 只有当进入一个执行上下文，该上下文的变量对象才会被激活， 其属性才能被访问
 * 
 * 执行上下文的两个阶段: 分析(进入执行上下文)与执行(代码执行)
 */

 this instanceof Object; // true

 // 活动对象时进入函数上下文时刻被创建的，通过函数的arguments属性(Arguments对象)初始化

 // 进入执行上下文, 还没有执行代码
 /**
  * 变量对象包括：
  *   函数形参, 函数声明(如果变量对象已经存在相同名称的属性，就会完全替换这个属性)
  *   变量声明(如果与声明的形参或函数相同，不会干扰)
  */

  function foo(a) {
    var b = 2;
    function c () {};
    var b = function() {};
    b=2;
  }
  foo(1);
  // 进入执行上下文后，AO（变量对象）:
  AO = {
    arguments: {
      0:1,
      length:1
    },
    a:1,
    b:3,
    c: reference to function c () {},
    d: reference to FunctionExpression "d"
  }

  /**
   * 全局上下文的变量对象初始化是全局对象
   * 函数上下文的变量对象初始化只包括Arguments对象
   * 进入执行上下文时会给对象添加形参、函数声明、变量声明等初始的属性值
   * 代码执行阶段，会再次修改变量对象的属性值
   */
function foo() {
  console.log(a);
  a = 1;
}

foo(); // Uncaught ReferenceError: a is not defined
//执行第一段console 相应的AO, a没有通过var 声明，不会存AO
AO = {
  arguments: {
    length: 0,
  }
}

function bar() {
  a = 1;
  console.log(a);
}
bar();// 1
// 执行console时 的AO
AO = {
  arguments: {
    legnth: 0
  }
}
// 但是会到全局对象去找a

console.log(foo);  // 打印函数

function foo() {
  console.log('foo');
}

var foo = 1;

// ==> 会先进行函数声明提升，然后变量声明提升，进入执行上下文时，先处理函数声明，再处理变量声明
// 变量名称可以与形参名或函数名重名
