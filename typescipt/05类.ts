//类的定义

class Car{
    engine:string;//类属性
    constructor(engine:string){//构造函数
        this.engine=engine;
    }
    drive(distanceInMeters:number=0){ //方法
        console.log(`a car runs ${distanceInMeters} powerd by `+this.engine);
    }
}

let car=new Car('petrol');
car.drive(100);

//实现继承与多态

//使用extends继承Car类

class MotorCar extends Car{
    constructor(engine:string){
        super(engine);
    }
}

//在子类重写方法实现多态
class Jeep extends Car{
    constructor(engine:string){
        super(engine);
    }
    drive(distance:number=10){
        console.log('JEEP');
        return super.drive(distance);
    }
}

let tesla=new MotorCar('electricity');
let landRover:Car=new Jeep("petrol");

tesla.drive();
landRover.drive(200);


//抽象类
//抽象类即基类，只能被继承，不能实例化，抽象类必须包含抽象方法，抽象方法只能在继承类中被实现

abstract class Person{
    abstract speak():void;
    walking():void{
        console.log('i am walking');
    }
}

class Male extends Person{
    speak():void{  //抽象方法实现
        console.log('I am Male')
    }
}

let person=new Male();
person.speak();