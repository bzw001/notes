##### set
+ 1、set类似于数组，但是成员的值是唯一的。
```
    Set本身是一个构造函数，用来生成Set数据结构
    const s=new Set();
    [1,2,3].forEach(x=>s.add(x));
    for(let i of s){
        console.log(i);
    }
    
    set可以接收数组或者类数组作为参数，去重后加入Set中
    let s2=new Set([1,2,1]);
    
    let s3=new Set(document.querySelectorAll('div');
    
    保持结构中值的唯一使用了“Same-value quality”.类似精确相当符（===）
    NaN被视为相等，但是对象不是
```

+ 2、Set实例拥有的方法与属性
```
    Set.prototype.constructor:构造函数，默认是Set函数
    Set.prototype.size:返回Set实例的成员总数
    
    set包括操作方法与遍历方法：
      四个操作方法：
        add(value):添加某个值。返回Set结构
        delete(value)；删除某个值，返回一布尔值，表示是否删除成功
        has(value):返回一个布尔值
        clear():清除所有成员，没有具体返回值
        
    Array.from可以将Set结构转为数组:
       这样可以组成数组去重的方式:
         function dedupe(array){
             return Array.from(new Set(array));
         }
         dedupe([1,1,2]);//[1,2]
         
    
    用于4个遍历的方法：
        keys():返回键名
        如：for(let item of s1.keys()){...}  for of也可以实现
        values();返回键值，由于Set结构没有键名，只有键值，所以它的行为与keys()是一样的。
        entries():返回键值对的遍历器
        forEach():使用回调函数遍历每个成员。键名与键值是相等的。[1,1],
        
    使用Set结构可以实现简单的去重外，如[...s1],同时它支持数组的map与filter的方法 
    
    实现交集，并集，差集:
        let s1=new Set([1,2,3]);
        let s2=new Set([4,3,2]);
        
        //并集
        let union=new Set([...s1,...b]);
        
        //交集
        let intersect=new Set([...s1].filter(x=>b.has(x)));
        
        //差集
        let difference=new Set([...a].filter(x=>!b.has(x)));
        
    结合map或者Array.from()可以在遍历中改变原来的set结构
```

+ 3、WeakSet，weak结构与Set类似，只是有两点区别
  > 1、WeakSet的成员只能是对象
    2、weakSet中的对象时弱引用。如果其他对象不再引用该对象，垃圾回收机制会自动回收该对象所占的内存。
    基于这两点，WeakSet的成员不适合被引用，可以临时存放一组对象或与对象绑定的信息，
   WeakSet没有size属性以及不可以被遍历，只有Set的前3种操作方法。

##### Map数据结构
+ 1、map出现是因为之前的对象是键值对组合，传统上只能用字符串当做键
```
    map实现了可以各种类型的值都可以当作键,对于键值对数据结构，Map比Obejct更适合
    const m =new Map();
    const 0 ={'p':'hello world'};
    m.set(o,'content');
    m.get(o);//'content'
    m.has(0);//true
    m.delete(o);//true
    m.has(o);//false
    
    接受数组作为参数，数组为一个个表示键值对的数组
    const map=new Map([
        ['name','张三'],
        ['title','Author']
    ]);
    map.size;//2
    map.has('name');//true
    map.get('name');//'张三'
    
    可以接受具有遍历接口的数据接口作为参数
    const set=new Set([
        ['foo',1],
        ['bar',2]
    );
    const m1=new Map[set];
    
    对同一键进行多次赋值，会进行覆盖
    const map=new Map();
    map.set(1,'aa');
    map.set(1,'bb');
```

+ 2、Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就会被视为两个键
```
    const map=new Map();
    map.set(['aaa'],1);
    map.get(['aaa']);//undefined,因为地址不一样
```

+ 3、Map属性与操作方法
```
    属性:
       1、size：返回成员总数
       
    方法：
        1、set：设置键值对,可以链式写法
        let map=new Map()
            .set(1,'a')
            .set(2,'b')
        2、get(key)
        3、has(key)
        4。delete(key)
        5、clear()
    4个遍历方法：keys(),values(),entries(),forEach(),遍历出来的顺序就是插入的顺序
    Map的默认遍历接口是entries方法
    
    使用扩展运算符(...)将Map结构转为数组结构
    const map=new Map([
        [1,'1'],
        [2,'2'],
        [3,'3']
    ])
    
    [...map.keys()];//[1,2,3]
    [...map.values];//['1','2','3']
    [...map];//[[1,'1'],[2,'2'],[3,'3']
    
    forEach方法还可以接受第二个参数用来绑定this
```

+ 4、与其他数据结构互相转换
```
    1、转为数组
    [...map]等
    
    2、数组转为map
    new Map([
        [true,7],
        [{foo:3},['abc']]
    ])
    
    3、Map转为对象
    需要map的键都为字符串，才能转
    function strMapToObj(map){
        let obj=Object.create(null);
        for(let [k,v] of map){
            obj[k]-v;
        }
        return obj;
    }
    
    4、对象转为Map
    function  objToMap(obj){
        let map=new Map();
        for(let k of Object.keys(obj)){
            map.set(k,obj[k]);
        }
        return map;
    }
    
    5、map转为JSON
      a、map键名为字符串，可以转为对象JSON
      b、map的键名有非字符串，可以选择转为数组JSON
      
    6、JSON转Map，只要先转为对象，然后转Map即可
```

##### WeakMap

>与Map的区别两点：
  1、只接受对象为键名
  2、WeakMap的键名所指向的对象，不计入垃圾回收机制
  使用：针对一些对象保存一些数据，但是又不需要手动将其释放，当该对象清除后，就自动释放
  WeakMap只要四个方法：get(),set(),has(),delete(),forEach90是不存在的。