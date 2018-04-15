
/**
 * 实现一个lazyman:
 * LazyMan('Hank') // I am Hank
 * LazyMan('Hank).sleep(10).eat('dinner') 
 * // I am Hank
 * //等待10s
 * // Wake  up after 10s
 * // Eat dinner
 * LazyMan('Hank').sleepFirst(5).eat("supper")
 * // 等待5s
 * // Wake up after 5
 * // I am Hank
 * // Eat supper
 * 依次类推
 * 考察点: 
 * 异步任务的执行，eventLoop的理解
 * 
 * 需要实现一个任务队列，去队列头一次次执行，通过管理队列任务顺序，从而实现任务执行的顺序,通过流控制来强制执行流程
 */
// ES5版本
 function LazyMan1 (name){
    return new Lazy_Man1(name);
 }
 function Lazy_Man1(name){
     var _this = this;
     this.queue = [];
     var fn = function (){
         console.log('I am '+ name);
         _this.next();
     }
     this.queue.push(fn);
     setTimeout(function(){
         _this.next();
     },0);
 }
 Lazy_Man1.prototype = {
     next:function(){
         if(!this.queue.length) return;
         var _this = this;
         var task = this.queue.shift();
         if (typeof task === 'function') {
             task();
         }
         return this;
     },
     sleep:function(time) {
         var _this = this;
         if(typeof time !== 'number') {
             throw new Error('sleep time should be a number');
         }
         var fn = function(){
            setTimeout(function() {
                console.log('Wake up after ' + time + 's');
                _this.next();
            },time*1000)
         };
         this.queue.push(fn);
         return this;
     },
     sleepFirst:function(time) {
        var _this = this;
        if(typeof time !== 'number') {
            throw new Error('sleep time should be a number');
        }
        var fn = function(){
            setTimeout(function(){
                console.log('First sleep ' + time +'s');
                _this.next();
            },time*1000)
        };
        this.queue.unshift(fn);
        return this;
     },
     eat:function(type) {
         var _this = this;
         var fn = function(){
             console.log('Eat ' + type);
             _this.next();
         }
         this.queue.push(fn);
         return this;
     }
 }

//  LazyMan1('Hank').sleep(1).eat('dinner');
 
//  LazyMan1('Hank').sleepFirst(5).eat("supper")
// ES6

function lazyMan (name){
    return new LazyMan(name)
}

class LazyMan{
    constructor(name) {
        this.name = name ;
        this.queue = [];
        this.queue.push(() => {
            console.log(`I am ${this.name}`);
            this.next();  
        });
       setTimeout(() => {
           this.next();
       },0)
    }
    next(){
        if (!this.queue.length) return;
        let task = this.queue.shift();
        if (typeof task !== 'function') return;
        task();
    }
    sleepFirst(time){
        this.queue.unshift(() => {
            setTimeout(() => {
                console.log(`Frist wakeUp after ${time} s `);
                this.next();
            } , time * 1000)
        })
        return this;
    }
    sleep(time) {
        this.queue.push(() => {
            setTimeout(() => {
                console.log(` wakeUp after ${time} s `);
                this.next();
            }, time * 1000)
        });
        return this;
    }
    eat(type){
        this.queue.push(() => {
            console.log(`Eat ${type}`);
            this.next();
        });
        return this;
    }
}

lazyMan('Hank').sleep(1).eat('dinner');
 
lazyMan('Hank').sleepFirst(5).eat("supper")