+ 1、proxy是用来干嘛的？ proxy是用来修改某些操作的默认行为的，在语言层面上做一些修改
```
   如在对象前假设一层‘拦截’，外界访问对象都必须通过这层拦截
   例:
        var obj= new Proxy({},{
            get:function(target,key,receiver){
                console.log(`getting $(key)!`);
                return Reflect.get(target,key,receiver);
            },
            set:function(target,key,value,receiveer){
                console.log(`setting $(key)!`);
                return Reflect.set(target,key,value.receiver);
            }
        })
        
        obj.count=1;
        //setting count!
        ++obj.count;
        //getting count!
        //setting count!
        //2
        
        Proxy相当于重载了点运算符.
```

+ 2、proxy接受两个参数，第一个参数是需要代理（或者需要拦截）的对象，第二个参数是拦截处理函数。目标对象正常使用，只是返回被拦截处理过的数据

+ 3、proxy支持的拦截操作

```
   get(target,propKey,receiver)    拦截对象属性的读取
   
   set(target,propKey,value,receiver);   拦截对象属性的设置
   
   has(target,proKey)     拦截 key in proxy 的操作，返回布尔值
   
   ownKeys(target)   拦截Object.getOwnPropertyName(proxy) ,Object.getOwnPropertySymbols(proxy),Object.keys(proxy)
   
   deleteProperty(target,propKey)
   
   getOwnPropertyDescriptor(target,propKey)  拦截同名方法，返回属性的描述对象
   
   defineProperty(target,propKey,propDesc)   
   
   preventExtensions(target)
   
   isExtensible(target)
   
   setPrototypeOf(target,proto)
   
   apply(target,object,args)
   
   construct(target,args)
   
```
