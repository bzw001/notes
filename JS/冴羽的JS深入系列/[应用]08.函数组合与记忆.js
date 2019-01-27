/**
 * 利用compose 将两个函数组合成一个函数，代码从优向左进行，而不是由内向外进行，可读性大大提升
 * 例：compose(d,c,b,a)
 * remda.js
 */
/// underscode的compose函数实现
 function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function() {
    var i = start;
    var result = args[start].apply(this, arguments);
    while(i--) result = args[i].call(this, result);
    return result;
  }
 }

 /// pointfree
 /// 函数无须提及将要操作的数据是什么样的
 /// 本质是使用一些通用的函数，组合出各种复杂运算，上层运算不要直接操作数据，而是通过底层函数去处理。
 /// 即不使用所要处理的值，只合成运算过程

 /// 使用compose或者R.pipe

 var getIncompleteTaskSummaries = function(mermbername) {
   return fetchData()
            .then(R.pipe(
              R.prop('tasks'),
              R.filter(R.propEq('username',mermbername)),
              R.filter(R.propEq('complete', false)),
              R.map(R.pick(['id', 'dueDate', 'title', 'priority'])),
              R.sortBy(R.prop('dueDate')),
              console.log
            ))
 }


 /**
  * 函数记忆是指上次的计算结果缓存起来，当下次调用的时候，如果遇到相同的参数，就直接返回缓存中的数据
  * 牺牲算法的空间复杂度以换取更优的时间复杂度
  * 场景:
  * 需要大量重复的计算/大量计算依赖于之前的结果
  */

  ///例如
  function add (a,b) {
    return a + b;
  }
  // 假如memoizdAdd 可是记忆
  var memoizeAdd = memoize(add);
  memorizedAdd(1,2); // 3
  memorizedAdd(1,2); // 相同的参数，第二次调用时，从缓存读取数据


  /// underscore 实现
  /// hasher函数可以自定义存储的key值
  /// 可以使用JSON.stringify
  var memorize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key)
      if(!cache[address]) {
        cache[address] = func.apply(this, arguments);
      }
      return cache[address];
    };

    memoize.cache = {};
    return memoize;
  }

  var memoizeAdd = memoize(add, function() {
    var args = Array.prototype.slice.call(arguments);
    return JSON.stringify(args);
  })