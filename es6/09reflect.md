+ 1、Reflect的作用
> 即使使用proxy，一样可以使用Reflect来让对象使用正常方法，同时使用Reflect对象可以拿到语言内部的方法。

+ 2、设计这个api的主要目的
```
  1、将Object对象的一些属于语言内部的方法放到Reflect对象上面。从Reflect对象可以拿到语言内部的方法。
  
  2、修改某些object方法的返回结果
  例;
      try{
          Object.defineProperty(target,property,attributes);
      }catch(e){
          
      }//这样是抛出错误
      
      
      //还可以这样写
      if(Reflect.defineProperty(target,property,attributes)){
          //success
      }else{
          //failure
      }
    2、让Object操作变为函数行为
    例:
      'key' in Object
      
      //现在可以这么写
      Reflect.has(Object,'key')//true
      
    3、Reflect拥有Proxy的同名方法，不管Proxy怎么修改，Reflect上总能找到未被拦截的默认行为。
    
    4、对于一些比较老的写法，他能提供新的
    例:
       Fucntion.prototype.apply.call(Math.floor,undefined,[1.75]);
       
       //新写法
       Reflect.apply(Math.floor,undefined,[1.75]);

```

+ 3、Reflect支持13种方法，基本与proxy的方法同名。