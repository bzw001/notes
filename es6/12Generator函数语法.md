+ 1、Generator是干嘛的
> 异步编程解决方案。首先它是一个函数，结合yield，封装多种状态，已达到异步编程。

+ 2、Generator的基本使用
```
  1、写法：function 后+ *，然后函数内部yield设置状态
  例:
      function* heGenerator(){
          yield ''hello;
          yield "world";
          return "ending";
      }
      
       let hW=heGenerator();//这里相当于产生一个遍历对象
       conso;e.log(hw.next()); //{value:'hello',done:false};
        conso;e.log(hw.next()); //{value:'world',done:false};
        conso;e.log(hw.next()); //{value:'ending',done:true};
   
   
   2、遍历器对象next的运行逻辑:
      a、函数运行时，遇到yeild表达式，就会停止执行后面代码，将yield后面紧跟的值作为value，结合done属性值作为一个对象返回。
      b、一直next，知道return语句，如果没有，则知道代码段结束，返回的value是undefiend.
   
   3、函数里的代码需要在生成遍历器对象调用next才会执行。即使没有yield
      例:
          function* f(){
              console.log('f执行')
          }
          
          var generatot=f();
          setTimeout(function(){
              generator.next();
          },1000)
          
    4、使用细节
       a、yiled只能放在Generator函数,放在其它地方会报错。
       b、如果yield与其他表达式混合，那么需要加一个括号，如果是函数参数或者位于赋值表达式的右边，则不需要添加
         例:
            function* demo(){
                foo(yield 'a',yiled 'b');
                console.log('hello'+yield);
            }
       c、注意一个yield代表一个暂停，无论它是函数参数，还是什么。
          foo(yiled 'a',yield 'b');暂停三次next后，才会执行foo函数
          
```

+ 3、与Interator的巧妙关系
```
   Generator函数是遍历器生成函数，因此吧Generator复制给对象的Symbol.iterator属性，可以让该对象具有Iterator接口
    例: 
       var myIterable={};
       myIterable[Symbol.iterator]=function* (){
           yield 1;
           yield 2;
           yield 3;
       };
       
       [...myInterable];//[1,2,3]
       
       Genertor函数返回一个遍历器对象，该对象也有Symbol.iterator属性
       function * gen(){};
       var g=gen();
       g[Symbol.iterator]()===g;//Symbol.iterator执行后返回自己

```

+ 4、next方法的参数
```
    yield表达式本身是没有明确的返回值的（总返回undefined）。next方法可以带一个参数，这个参数可以作为上一个yield表达式的返回值。
    注意，是本次next的参数值作为上次yield的返回值。当yield返回值参与具体运算时，那么next参数就发挥作用。
    
    这样带来的重大意义：可以在函数运行的不同阶段，通过next传参，来调整函数行为。
    例：
       function* foo(x){
           let y=2*(yield (x+1));
           let z=yield(y/3);
           return  (x+y+z);
       }
       
       var a=foo(5);
       a.next();//{value:6,done:false}
       a.next();//{value:NaN,done:false}
       a.next();//{value:NaN,done:true}
       
       var b=foo(5);
       b.next();//{value:5,done:false};
       b.next(12);//{value:8,done:false};
```

+ 5、与for ...of的关系
```
    1、for...of可以自动遍历Generator对象,不需next方法
      function* foo(){
          yield 1;
          yield 2;
          yield 3;
          return 4;
      }
      
      for(let v of foo()){
          console.log(v);// 1 2 3 
      }
      注意，当检测到返回对象的done属性为true时，for...of循环就会终止，不会返回该对象，所以上面的return返回的值就不会返回。
      
    2、写出可以用for...of遍历所有对象的方法.
       例:
          function* ObjectEntries(obj){
              let proprKeys=Reflect.ownKeys(obj;
              for(let propKey of propKeys){
                  yield [propkey,obj[propKey]];
              }
          }
          
          let obj={a:'a',b:'b'};
          for(let [key,value] of ObjectEntrise(obj)){
              console.log(`$[key]:${value}`);
          }
          
          也可以将这个方法加到对象的Symnol.iterator上
            function* objectEntries(){
                let propKeys=Reflect.ownKeys(this);
                for(let propKey of propKeys ){
                yield [propKey,this[propKey]];
                }
            }
            Object.prototype[Symbol.iterator]=objectEntries;

            for(let [key,value] of {a:"a",b:'b'}){
                console.log(`${key}:${value}`)
            }
            
    3、扩展运算符（...），解构赋值，Array.from方法内部迪奥弄，都是遍历器接口，都可以将
    Generator函数返回的Iterator对象作为参数。
       function* numbers(){
           yield 1;
           yeild 2;
           return 3;
           yield  4;
       }
       
       [...numbers()];//[1,2]
       Array.from(numbers());//[1,2]
       let [x,y]=numbers();//[1,2]
       
```

+ 6、遍历器对象拥有的方法
```
    1、Generator.prototype.throw() ,在函数体外抛出错误，Generator函数体内可以捕获
      例:
      let g=function* (){
          try{
              yeild;
          }catch(e){
              console.log('内部捕获',e);
          }
      }
      var i=g();
      i.next();
      
      try{
          i.throw('a');
          i.throw('b');
      }catch(e){
          console.log('外部获取',e);
      }
      第一次捕获是Generator函数内部的捕获，它捕获完了之后，第二次throw被外部捕获。
      
      注意：throw方法被捕获以后，会附带执行下一条yield表达式
       当Generator执行过程中抛出错误，没有被内部捕获，就不会被执行下去。如果继续执行next方法，
       那么将返回{value:undefined,done:true};,js引擎会认为这个Generator遍历已经结束.
      
    2、Generator。prototype.return()  返回指定值，并结束遍历。相当于主动提前结束遍历
      例:
        function * gen(){
            yield 1;
            yield 2;
            yield 3;
        }
        
        let g=gen();
        g.next();//{value:1,done:false}
        g.return('a');//{value:'a',done:true};
        g.next();//{value:undefined,done:true};
        
      如果Generator函数内部有try-finnaly代码块，那么return党阀会推迟到finally代码块执行完执行。
        function* numbers(){
            yield 1;
            try{
                yield 2;
                yield 3;
            }finally{
                yield 4;
            }
        }
        let g=numbers();
        g.next();
        g.mext();
        g.return(7);//{value:4,done:false};
        g.next() //{value:5,done:false}
        g.next()//{value:7.done:true}
      
    
```

+ 7、yield* 表达式
```
    1、在Generator函数内部调用另一个Generator默认是没作用的。需要使用yield*，将遍历器包含。
     例:
        function* foo(){
            yield 'a';
            yield 'b';
        }
        
        function* bar(){
            yield 'x';
            yield* foo();
        }
        //相当于
        
        function* bar(){
            yield 'x';
            yield 'a';
            yield  'b';
        }
        //等同于
        function* bar(){
            yield 'x';
            for(let v of bar()){
                \yield v;
            }
        
        }
        
        注意如果没有使用yield*，那么后面返回的是一个Generator遍历器对象
        
        如果有return语句的时候，则需要用
        var value=yield* iterator的形式获取return语句的值。
        
        事实上，只要yield*后面跟的是一个可有iterator接口的数据结构，那么就可以被yield*遍历。
         例:
            function* gen(){
                yield* ['a','b','c'];
            }
            gen.next();//{value:'a',done:false}
            
        yield* 遍历取出嵌套数组的所有成员
        例: 
           function* itemTree(tree){
               if(Array.isArray(tree)){
                   for(let i=0;i<tree.length;i++){
                       yield* iterTree(tree[i]);
                   }
               }else{
                   yield tree;
               }
           }
           
           consot tree=[1,2,[1,2],[2]];
           
           for(let x of iterTree(tree)){
               console.log(x);
           }
           
         
        yield* 语句遍历完全二叉树
        例:
          //二叉树的构造函数
          //三个参数分别是左树，当前节点，右树
          function Tree(left,label,right){
              this.left=left;
              this.label=label;
              this.right=right;
          }
          
          //中序遍历函数
          //返回一个遍历器，使用generator函数
          //函数体内采用递归算法，所以左树与右树需要使用yield*遍历
          function* inorder(t){
              if(t){
                  yield* inorder(t.left);
                  yield t.label;
                  yield* inorder(t.right);
              }
          }
          
          //生成二叉树
          function make(array){
              //判断是否是叶节点
              if(Array.length==1) return new Tree(null.array[0],null);
              return new Tree(make(array[0],array[1],make(array[2])));
          }
          let tree=make([[['a'],'b',['c'],'d',[['e'],'f',['g']]]]);
          //遍历二叉树
          var result=[];
          for(let node of inorder(tree)){
              result.push(node);
          }
          console.log(result);
          
```

+ 8、作为对象属性的Gemerator函数
```
    简写:
       let obj={
           * myGen(){
               ...
           }
       }
```

+ 9、Generator函数的this
```
  Generator函数总返回一个遍历器，该遍历器对象会集成Generator函数prototype对象的方法。
  当其prototype定义属性，那么生成的遍历器对象也可以使用该属性
  Generator函数不能直接与new一起使用。
  
  结合Generator函数的prototype，new出具有遍历器属性的对象.
  例:
    function* gen(){
        this.a=1;
        yield this.b=2;
        yield this.c=3;
    }
    
    function F(){
        return gen.call(gem.prototype);
    }
    
    var f=new F();
    f.next();//{value:2,done:false};
    f.next();//{value:3,done:false};
    f.next();// {value:undefined,done:true};
    
    f.a;//1
    f.b;//2
    f.c;//3
```

+ 10、Generator的作用
```
   1、实现状态机
     var clock=function* (){
         while(true){
             console.log('true');
             yield;
             console.log('false');
             yield;
         }
     }
     
    2、Generator与协程
     js是单线程语言，只能保持一个调用栈，引入协程后，每一个任务可以保持自己的调用栈。
     这样在抛出错误的时候，可以找到原始的调用栈。
     如果将Generator函数当做协程，可以将多个需要互相协作的任务协程Generator函数。
     他们之间通过yield表达式交换控制权。
     
    3、异步操作的同步化表达
       异步操作的后续操作可以放在yield表达式下面，等调用next方法执行才执行。
       这样可以使用Generator函数来处理异步操作。
       
       例：
          function* loadUi(){
              showLoadingScreen();
              yield loadUiDataAsynchronously();
              hideLoadingScreen();
          }
          
          let loader=loadUi();
          loader.next();//加载UI，并异步加载数据
          loader.next();//隐藏UI
          
        例: ajax操作
           function* main(){
               let result=yield request("http://aaa.");
               let resp=Json.parse(result);
               console.log(resp.value);
           } 
           
           function request(url){
               makeAjaxCall(url,function(response){
                   it.next(response);
               })
           }
           
           let ir=main();
           it.next();
          //让ajax操作更自然。
          
         例: 逐行读取文本文件
           function* numbers(){
               let file=new fileReader('number.text');
               try{
                   while(!file.eof){
                       yield parseInt(file.readLine().10);
                   }
               }finally{
                   file.close();
               }
           }
           
    4、控制流管理  ,让多步操作更加直观
      //回调函数版
      step1(function(value1){
          step2(value1,function(value2){
              step2(value2,function(value3){
                  step4(value3,function(value4){
                      ...
                  })
              })
          })
      })
      
      //Promise版
      Promise.resolve(step1)
             .then(step2)
             .then(step3)
             .then(step4)
             .then(function(value4){
                 ...
             },function(error){
                 ...
             })
             .done();
             
      //Generator函数版
      function* longRunningTask(value1){
          try{
              let value2=yield step1(value1);
              let value3=yield step2(value2);
              let value4=yield.step3(value3);
              let value5=yield step4(value4);
          }catch(e){
              ...
          }
      }
      
      scheduler(longRunningTask(initialValue));
      function scheduler(task){
          let taskObj=task.next(task.value);
          if(!taskObj.done){
              task.value=taskObj.value;
              scheduler(task);
          }
      }//这里只适合同步操作。
      
      for...of本质上是一个while循环
      
      5、给对象部署Iretator接口
      
      
      
    
```
