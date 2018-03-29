+ 1、作用：解决异步编程

+ 2、关于promise的一些概念
```
   1、Promise的三种状态：pending（进行中），fulfilled，rejected
   
   2、状态不可逆转，同事不设置catch函数，那么Promise内部函数的错误不会被检测到
   
```

+ 3、Promise的用法

```
   1、Promise对象是一个构造函数，用于生成promise实例 
      构造函数接受一个函数作为参数，函数参数为resolve与reject。它们两个是函数
      实例生成之后可以使用then指定Resolved与rejected状态的回调函数
    例：
       var promise=new Promise(function(){resolve,reject}{
           if(..){
               resolve(value);
           }else{
               reject(error)
           }
       })
       
      function timeout(ms){
          return new Promise((resolve,reject)=>{
              setTimeout(resolve,ms,'done')
          });
      }
      
      timeout(100).then((value)=>{
          console.log(value);
      })
      
      
    2、如果在Promise里面使用resolve或者reject函数带有参数，那么这个参数会被传递给then中的回调函数
    
    3、resolved事件总是晚于本轮循环的同步任务。
    
    4、Promise.prototype.then()  ,第一个参数是Resolved状态的回调函数，第二个参数是Rejected状态的回调函数
       then返回的是Promise，后面可以继续then
    
    5、Promise.prototype.catch()  一般放在then后面捕获错误,只要是异步操作跑出的错误，都会被变为Rejected，都会被catch捕获.catch方法返回promise，
    后面还可以加then
    例 :
        p.then((val)=>console.log('fulfilled:',val))
         .catch((err)=>console.log('rejected'.err));
        
        类同与try，catch
        
       当多个promise时，Promise对象的错误具有冒泡性质，会一直向后传递，知道被捕获位置，错误总是会被下一个catch捕获。
    6、建议：使用catch而不使用then的第二个参数处理错误
       原因: 它可以捕获then方法中执行的错误。更接近同步的写法.
            
        对于catch抛出的错误，可以后面再加一个catch承接.
        例 ：
        
           promise.then(()=>{
               return promise;
           }).catch((error)=>{
               y+2;
           }).catch((error)=>{
               console.log(error);
           })
```

+ 4、promise的其它方法
```
    1、Promise.all()  将多个Promise实例打包
    
    let p=Promise.all([p1,p2,p3]);// p1.p2.p3都是promise
    只有三个promise的状态为fulfilled，p的状态才为fulfilled,不然为rejected
    
    Promise.all()可以定义catch方法，但是如果其里面的promise定义了catch方法，而且必触发，那么只会触发该promise的catch方法。
    
    
    2、Promise.race()  打包多个promise实例
       let p=Promise.race([p1,p2,p3]);
       当里面打包的promise有一个状态被改变，那么p的状态随之改变,这个最先改变的promise的返回值会被传送到p的回调函数中.
    例：
       const p=Promise.race([
           fetch('/resource-that'),
           new Promise((resolve,reject)=>{
               setTimeout(()=>reject(new Error('request error')),500)
           })
       ]);
       
       p.then(response=>console.log(response));
       p.catch(error=>console.log(error))//5s，fetch方法没有返回结果，就会将p的状态变为rejected
       
       
     3、Promise.resolve()  将现有对象转为Promise对象
     
     Promise.resolve('foo');
     等价于：
     new Promise(resolve=>resolve('foo'));
     
     接受一个参数：参数可以分为4种情况
      a、不带参数，直接返回状态为Resolved的Promise对象
          var p =Promise.resolve();
          p.then()..//里面的resolve会在本轮事件循环执行。
          
      b、参数不是对象或者是没有then方法的对象,resolve方法会被立即执行，因为没有异步操作
      var p=Promise.resolve('hello');
      p.then(function(s){
          console.log(s);
      })
      
      c、参数是一个具有then方法的对象
       先执行该对象的里的then方法，状态变为resolved，然后再执行promise的then
       例:
          let thenable={
              then:function(resolve,reject){
                  resolve(42);
              }
          }
          let p1=Promise.resolve(thenable);
          p1.then(function(value){
              console.log(value);
          })
      
      d、参数是一个Promise对象
      不做任何修改，直接返回这个实例。
      
    4、Promise.reject()  返回一个新的Promise实例，实例的状态为rejected
    注意，Promise.reject()方法的参数，会原封不动的作为reject的理由,变成后续方法的参数,即使catch
    
    
    5、非官方api，但是有用的方法:
       done() ：处于回调链的尾端，保证抛出任何可能出现的错误
       实现代码:
           Promise.prototype.done=function(onFulfilled,onRejected){
               this.then(onFulfilled,onRejected)
                   .catch(function(reason){
                       //抛出全局错误
                       setTimeout(()=>{throw reason},0)
                   })
           }
       
       
       finally():不管怎样，最后都会执行的操作，接受一个回调作为参数。
       实现代码：
           Promise.prototype.finally=function(callback){
               let p=this.constructor;
               return this.then(
                value=>p.resolve(callback()).then(()=>value),
                reason=>p.resolve(callback()).then(()=>{throw reason});
               )
           }
           
        Promise.try() 同时处理同步与异步操作
        普通情况下：
          Promise.resolve().then(f);//如果f是同步函数，那么会在本轮事件循环的末尾执行
          
        让同步函数同步执行，异步函数异步执行的方法:
        
        const f=()=>console.log('now');
        (
            ()=>new Promise(
                resolve=>resolve(f());
            )
        )();
        
        执行new Promise（），同步函数也会执行
        
        现在有提案提供Promise.try方法。
     
```