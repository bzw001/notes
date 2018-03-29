+ 1、symbol是什么?
>  Symbol是js的第7种数据类型，它的出现是为了防止属性名的冲突
   Symbol值通过Symbol函数生成，独一无二，从此对象的属性名可以是字符串，还可以是Symbol类型
```
    let s=Symbol();//不要使用new命令
    可以接受一个支持串作为参数表示对Symbol实例的描述
    var s1=Symbol('foo');
    s1.toString();//"Symbol(foo)"
    
    Symbol类型可以转字符串，布尔，但是不能直接参与运算，不能转数值
```

+ 2、作为对象的属性名，主要好处是当一个对象有多个模块，可以避免一个键被误改写或覆盖
```
    注意使用点运算符，后面跟的是字符串，但是Symbol是单独的数据类型
    var mySymbol=Symbol();
    a[mySymbol]='hello';
    
    可以定义一些不会重复的常量:
    如let color=Symbol();
```

+ 3、可以使用Symobl为对象定义一些非私有的，但是有只用于内部的方法
```
    只有Object.getOwnPropertySymbols与Reflect.ownKeys能遍历Symbol键名
```

+ 4、Symbol.for()以及Symbol.keyFor()
```
    let s1=Symbol.for('foo');//如果有以 'foo'为名称的Symbol，那么就直接赋给这个Symbol值，如果没有
    则新建，而Symbol()则总是新建
    
    let s2=Symbol.keyFor('foo');//一定要找到以 'foo '为名称的Symbol，不然为undefined
    
    注意Symbol.for为Symbol值登记的名字是全局环境的。
```

+ 5、内置的Symbol值,含11个内置的Symbol值
```
 如：
  Symbol.species,指向当前对象的构造函数
  
  Symbol的内置值一般是针对一些方法调用时，Symbol值会被默认调用，这样可以在一些内置方法被调用的时候，执行一些默认的功能
```