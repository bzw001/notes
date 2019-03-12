/**
 * 单个异步任务
 */

function* gen() {
  var result = yield Promise.resolve(1);
  console.log(result);
}

// 获得最终得执行结果
/**
 * 首先执行Generator函数，获取遍历器对象
 * 使用next 方法，执行异步任务得第一阶段，即fetch(url)
 * fetch(url)会返回一个Promise对象，所以result的值为:
 * {value: Promise{ <pending>, done: false }}
 * 最后为Promise对象添加一个then方法, 先将返回的数据格式化,
 * 再调用g.next, 将获得的数据传禁区, 执行异步任务的第二阶段，代码执行完毕
 */
var g = gen();

var result = g.next();
result.value.then(function(data) {
  return ++data;
}).then(function(data) {
  g.next(data); // 2, 执行完
})

/**
 * 多个异步任务
 * 按照上面的写法，需要写多个then来传递数据处理
 * 可以利用递归写一个run函数，自动执行
 */

 function run(gen) {
   var g = gen();
   function next(data) {
     var result = g.next(data);
     if(result.done) return;
     
     result.value.then(data => {
       return data;
     }).then(data => next(data));

   }

   next();
 }

 /**
  * yield支持后面跟回调函数或者Pormise
  */
 function fetchData(url) {
  return function(cb) {
    setTimeout(() => {
      cb({status: 200, data: url})
    },2000)
  }
}
function* gen() {
  var r1 = yield fetchData('1');
  var r2 = yield fetchData('2');

  console.log(r1.data, r2.data);
}

var g = gen();
var r1 = g.next();
r1.value(data => {
  console.log(data);
  var r2 = g.next(data);
  
  r2.value((data) => {
    g.next(data);
  })
})


// 如何再Generator函数中捕获错误，或者得到返回值呢
// Generator返回一个Promise

function run(gen) {
  return new Promise((resolve, reject) => {
    if(typeof gen == 'funtion') gen = gen();
    // 如果gen不是迭代器
    if(!gen || typeof gen.next !== 'function') return resolve(gen);
    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      }catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function onRejected(err) {
      var ret;
      try{
        ret = gen.throw(err);
      } catch(e) {
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if(ret.done) return resolve(ret.value);
      var value = toPromise(ret.value);
      if(value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('error'));
    }
  })
}

function isPromise(obj) {
  return 'function' === typeof obj.then;
}

function toPromise(obj) {
  if(isPromise(obj)) return obj;
  if('function' == typeof obj) return thunkToPromise(obj);
  return obj;
}

function thunkToPromise(fn) {
  return new Promise((res, rej) => {
    fn((err, res) => {
      if(err) return reject(err);
      resolve(res);
    })
  })
}

// 以上就相当于一个 co