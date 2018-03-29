//修饰符分为public,private,protected

//public修饰符是类的成员默认的,可以自由被方法
class Car1{
    public engine:string;
    public constructor(engine:string){
        this.engine=engine;
    }
    public drive(distance:number=100){
        console.log(distance);
    }
}

//protected 修饰符，允许本身与继承类访问
class Car3{
    protected engine:string;
    constructor(engine:string){
        this.engine=engine;
    }
    drive(distance:number=10){
        console.log(distance);
    }
}

class MotorCar2 extends Car3{
    constructor(engine:string){
        super(engine);
    }
    drive(distance:number=20){
        super.drive(distance);
    };
}

let testla3=new MotorCar2('electricity');
testla3.drive();
//console.log(testla3.engine);
//private 修饰符，表示类的外部不能访问,es6可以通过闭包的方式实现
class Car_2{
    private engine:string;
    constructor(engine){
        this.engine=engine;
    }
}
//new Car2('petrol').engine;//error

//给构造函数的参数给予修饰符，可以看做会直接初始化成员属性
class Car4{
    constructor(protected engine:string){};
}

//静态属性
//使用static来定义类的静态属性，这个属性只存在与类本身，同时只能用类名来调用

class Grid{
    static origin={x:0,y:0};
    constructor (public scale:number){};
    calculate(point:{x:number,y:number}){
        let xDist=point.x-Grid.origin.x;
        let yDist=point.y-Grid.origin.y;
        return Math.sqrt(xDist*xDist+yDist*yDist)/this.scale;
    }
}


