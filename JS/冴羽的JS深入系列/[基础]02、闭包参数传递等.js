/**
 * 一、参数传递：值传递
 * 1、如果参数不是对象，那么传递的是实参的值
 * 2、如果参数是对象，那么传递的是实参的引用的副本(地址)
 */


/**
 * 二、call与apply的模拟实现
 * call: 指定this与参数值后调用某个函数或方法
 *   a、this执行改变了
 *   b、函数执行了
 */

/// call 模拟实现
Function.prototype.call2 = function (context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args + ')');
  delete context.fn;
  return result;
}

/**
 * 三、bind的模拟实现
 * bind: 创建一个新函数，当这个新函数被调用的时候，bind的第一个参数作为它运行时的this,
 * 之后的一序列参数将会在传递的实参前传入作为它的参数
 */

Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    throw new Error("what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNop = function () { };

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNop ? this : context, args.concat(bindArgs))
  }

  fNop.prototype = this.prototype;
  fBound.prototype = new fNop();
  return fBound;
}


/**
 * 四、new的模拟实现
 *  new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
 *  new 的过程:
 *    新建对象，对象原型执行构造函数的prototype
 *    然后将原型中的this指向对象, 返回这个对象
 *  构造函数返回值影响实例的属性(es6的constructor一样):
 *  如果函数返回的是对象，那么实例中只能防卫返回的对象中的属性
 *  如果函数返回的不是对象，则能访问函数中定义在this中的值   
 */

function Otaku(name, age) {
  this.strength = 60;
  this.age = age;

  return {
    name: name,
    habit: 'Games',
  }
}

var person = new Qtaku('Kevin', '18');

console.log(person.name); // kevin
console.log(person.age);  // undefined
console.log(person.strength);  // undefined
console.log(person.habit);  // Games

// 模拟实现
function new2() {
  var obj = new Object;
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}


/**
 * 五、类数组对象
 * 拥有一个length属性与一些索引属性的对象
 * 如果需要使用数组的方法，需要使用Function.call间接调用
 *  非严格模式下，实参与arguments会共享
 *  严格模式下，实参和arguments是不会共享的
 * arguments应用的场景:
 *  1、参数不定长
 *  2、函数柯里化
 *  3、递归调用
 *  4、函数重载等
 */

/// 类数组转数组  slice,aplice,cancat,Array.from
Array.prototype.slice.call(arrayLike);
Array.prototype.splice.call(arrayLike, 0);
Array.from(arrayLike);
Array.prototype.concat.apply([], arrayLike);

/// callee属性, 可以调用函数本身
/// 例，解决闭包问题
var data = [];

for (var i = 0; i < 3; i++) {
  (data[i] = function () {
    console.log(argumnets.callee.i);
  }).i = i;
}
data[0](); //0
data[1](); //1
data[2](); //2

/// es6 转换arguments 为数组
function func(...arguments) {
  console.log(arguments);
}



/**
 * 五、创建对象的多种方式与优缺点
 */

 /// 工厂模式
 //// 对象无法识别，所有实例指向一个原型
 function createPerson(name) {
   var o = new Object();
   o.name = name;
   o.getName = function() {
     console.log(this.name);
   }
   return o;
 }

 /// 构造函数模式
 //// 每次创建实例时，每个方法都要创建一次
function Person(name) {
  this.name = name;
  this.getName = function(){
    console.log(this.name);
  }
}

var person1 = new Person('Kevin');

/// 优化版1构造函数
//// 方法不会被重复创建。 但是感觉不是封装

function getName() {
  console.log(this.name);
}

function Person(name) {
  this.name = name;
  this.getName = getName;
}

var person2 = new Person('kevin');

/// 优化版2构造函数
/// 实例通过constructor属性找到所属构造函数

function Person(name) {

}

Person.prototype = {
  constructor: Person,
  name: 'kevin',
  getName: function() {
    console.log(this.name);
  }
}

/// 组合模式
/// 构造函数与原型模式结合, 共享/私有都可以

function Person(name) {
  this.name = name;
}

Person.prototype = {
  constructor: Person,
  getName: function() {
    console.log(this.name);
  }
}

/// 寄生-构造函数-模式
//// 如可以实现具有额外方法的数组

function Person(name) {
  var o = new Object;
  o.name = name;
  o.getName = function() {
    console.log(this.name);
  }

  return o;
}

var pers1 = new Person('kevin');

/// 稳妥构造函数模式



/**
 * 六、继承的多种方式
 */

 /// 1、原型链继承
 // 引用类型的属性被所有实例共享，创建child的实例时，不能向Parnt传参
 function Parent () {
   this.name = 'kevin';
 }

 Parent.prototype.getName = function() {
   console.log(this.name);
 }

 function Child() {}

 Child.prototype = new Parent();

 var child1 = new Child();
 console.log(child1.getName()); // kevin

 /// 2、借用构造函数(经典继承)
 /// 每次创建实例都会创建一遍方法
 function Parent() {
   this.names = ['a','b'];
 }

 function Child() {
   Parent.call(this);
 }

 var child1 = new Child();
 child1.names.push('c'); 
 console.log(child1.name); // ['a','b','c']

 ///3、组合继承(最常用的继承模式)
 //// 原型链继承和经典继承双剑合璧

 function Parent(name) {
   this.name = name;
   this.colors = ['a','b'];
 }
 Parent.prototype.getName = function() {
   console.log(this.name);
 }

 function Child(name, age) {
   Parent.call(this, name);
   this.age = age;
 }

 Child.prototype = new Parent();
 Child.prototype.constructor = Child;

 /// 4、原型式继承
 // 缺点同原型链结成，包含引用类型的属性值都会共享相应的值
 function ceateObj(o) {
   function F(){}
   F.prototype = o;
   return new F();
 }

 /// 5、寄生式继承
 // 创建一个仅用于封装继承过程的函数，函数在内部异某种形式来增强对象，最后返回对象
 function createObj(o) {
   var clone = Object.create(o);
   clone.sayName = function() {
     console.log('hi');
   }
   return clone;
 }

 /// 6、寄生组合式继承
 function object(o) {
   function F(){}
   F.prototype = o;
   return new F();
 }

 function prototype(child, parent) {
   var prototype = object(parent.prototype);
   prototype.constructor = child;
   child.prototype = prototype;
 }
 
 prototype(child, parent);

 /**
  * 高程如此的称赞这种模式：
  * 这种方式的高效率体现它只调用了一次Parent构造函数，并且因为避免了在Parent.prototype上面创建不必要的，多余的属性
  * 与此同时，原型链还能保持不变，因此，还能够正常使用instanceof和isProtorypeOf。开发人员普遍认为
  * 寄生组合式继承式引用类型最理想的继承范式。
  */