//接口的使用方式类似JAVA，增加了更灵活的接口类型，包括属性，函数，可索引，和类等类型
//接口的作用：相当于设置变量函数等定义时的格式，数据将变得更加严格

//属性类型接口   ,检查相应的属性存在而且类型匹配
interface FullName{
    first:string;
    second:string;
}

//可选属性 使用?
interface  FullName1{
    first:string;
    second?:string;
}
function pritable(name:FullName){
    console.log(name.first+name.second);
}
let obj={first:'rose',second:'jack'};
pritable(obj);


//函数类型接口   明确函数的参数列表与返回值类型
//运用于函数时该参数不一定需要与接口同名

interface  encrypt{
    (val:string,salt:string):string;
}

let func08_01:encrypt;

func08_01=function(val:string,salt:string){
    console.log(val+salt);
    return '';
};


//可索引类型接口
//索引签名支持字符串与数字两种数据类型

interface  UserArray{//相当于必须为字符串数组
    [index:number]:string ;
}

interface  UserObject{//相当于键值为字符串的对象
    [index:string]:string;
}

let userArray:UserArray;
let userObject:UserObject;
userArray=['1','2'];
userObject={'name':'2'};


//类类型接口  规范一个类的内容
//可以规定属性，也可规定一个方法，然后在具体类中实现

interface  Animal{
    name:string;
}

class Dog implements Animal{
    name:string;
    constructor(n:string){};
}
//描述方法

interface  Anima2{
    name:string;
    setName(n:string):void;
}

class Dog2 implements  Anima2{
    name:string;
    setName(n:string){
        this.name=n;
    }
    constructor(n:string){};
}


//使用extends可以复制接口

interface  Animal3{
    eat():void;
}

interface  Person extends Animal3{
    talk():void;
}



