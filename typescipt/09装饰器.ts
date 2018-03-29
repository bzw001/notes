//装饰器附加到类，方法，属性或参数的声明上。能对相应的主题添加额外的行为。
//语法 ： @装饰函数 主体
//ts的装饰器提供的还是实验版，还没有最终确定下来，es7才会引入装饰器。但是在angular中会用到装饰器的知识，
//如果需要使用，那么需要在tsconfig.json中将experimentalDecorators设置为true
//每种装饰器类型传入的参数不大相同。

//方法装饰器     监视，修改与替换方法定义
//方法装饰器表达式在运行时当做函数被调用，可以传入三个参数
/**
 *target:类的原型对象
 *propertyKey:方法的名字
 *descriptor:成员属性描述
 *descriptor:成员属性描述   类型为TypedPropertyDescriptor
 */

export default class  TestClass {
    @log
    testMethod(arg:string){
        return "logMsg: "+arg;
    }
}

function log(target:Object,propertyKey:string,descriptor:TypedPropertyDescriptor<any>){
    let origin=descriptor.value;
    descriptor.value=function(...args:any[]){
        console.log("args:"+JSON.stringify(args));
        let result =origin.apply(this,args);//调用方法 ,这里调用的是testMethod方法.
        console.log("this result-"+result);
        return result;//返回结果
    };
    return descriptor;
}

new TestClass().testMethod('test method decorator');

//类的修饰器
//类的构造函数是唯一参数

@Component({
    selector:'person',
    template:'person.html'
})
class Person{
    constructor(
        public firstName:string,
        public secondName:string
    ){}
}

function Component(component){
    return (target:any)=>{
        return componetClass(target,component);
    }
}

function componetClass(target:any,component?:any):any{
    var original=target;
    function construct(constructor,args){
        let c:any =function(){
            return constructor.apply(this,args);
        };
        c.prototype=constructor.prototype;
        return new c;
    }

    let f:any=(...args)=>{
        console.log('selector:'+component.selector);
        console.log('template:'+component.template);
        return construct(original,args);
    };
    f.prototype=original.prototype;
    return f;
}

let p=new Person('angular','js');

//参数装饰器     用于类的构造函数或方法声明
//在angular中广泛使用
/**
 * 接受三个参数
 * target:对于静态成员，是类的构造函数，实例成员则是类的原型对象
 * propertyKey:参数名称
 * parameterIndex:参数在函数参数列表中的索引
 */

class userService{
    login(@inject name:string){};
}

//@inject
function inject(target:any,propertyKey:string|symbol,parameterIndex:number){
    console.log(target);
    console.log(propertyKey);
    console.log(parameterIndex);
}


//属性装饰器  用来修饰类的属性
/**
 * 接受两个参数
 * target:对于静态成员，是类的构造函数，实例成员则是类的原型对象
 * propertyKey:属性名字
 */


//装饰器组合
//多个装饰器的符合使用    @decoratorA @decoratorB  param  或者从上至下书写
//先从左至右执行装饰器函数（从上至下），得到返回结果
//返回结果会当做函数，从右至左依次调用,target能被改变后传入

function decorator1(component){
    console.log(component.name);
    return (target:any)=>{
        console.log('decorator1 的返回');
        console.log(target);
        return target;
    }
}

function decorator2(component){
    console.log(component.name);
    return (target:any)=>{
        console.log('decorator2 的返回');
        target.decorator2='2';
        return target;
    }
}

@decorator1({name:'decorator1'})
@decorator2({name:'decorator2'})
class Test{

}
let test=new Test();




